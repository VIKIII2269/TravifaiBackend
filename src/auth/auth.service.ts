import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { SignupDto, LoginDto } from './dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  private otpStore = new Map<string, { otp: string; verified: boolean; expiresAt: number }>();
  private mailTransporter: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    const port = process.env.EMAIL_PORT
      ? parseInt(process.env.EMAIL_PORT, 10)
      : 587;

    this.mailTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });
  }

  async signup(dto: SignupDto) {
    const { email, password, phone, username, role } = dto;
    if (role === Role.ADMIN && email !== 'tech@travifai.com') {
      throw new BadRequestException('Admin signup is not allowed.');
    }
    const [existingByEmail, existingByPhone, existingByUsername] =
      await Promise.all([
        this.prisma.user.findUnique({ where: { email } }),
        this.prisma.user.findUnique({ where: { phone } }),
        this.prisma.user.findUnique({ where: { username } }),
      ]);

    if (existingByEmail) throw new BadRequestException('Email is already registered');
    if (existingByPhone) throw new BadRequestException('Phone number is already registered');
    if (existingByUsername) throw new BadRequestException('Username is already taken');

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        username,
        role: role as Role,
      },
    });

    const token = this.jwtService.sign({
      sub: createdUser.id,
      email: createdUser.email,
    });
    return { access_token: token, userid: createdUser.id, role: dto.role };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const userRole = user.role;
    if (dto.role?.trim().toLowerCase() !== userRole?.trim().toLowerCase()) {
      throw new UnauthorizedException({
        message: 'Mismatch',
        registeredRole: userRole,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { access_token: token, userId: user.id, role: user.role };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('No user found with this email');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    this.otpStore.set(email, { otp, verified: false, expiresAt });

    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP to reset password is: ${otp}. It will expire in 10 minutes.`,
    };

    await this.mailTransporter.sendMail(mailOptions);
    return { message: 'OTP sent to your email address' };
  }

  async verifyOtp(email: string, otp: string) {
    const entry = this.otpStore.get(email);
    if (!entry || entry.otp !== otp || Date.now() > entry.expiresAt) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    entry.verified = true;
    this.otpStore.set(email, entry);
    return { message: 'OTP verified successfully' };
  }


  async resetPassword(email: string, newPassword: string) {
    const entry = this.otpStore.get(email);
    if (!entry || !entry.verified) {
      throw new UnauthorizedException('OTP not verified');
    }

    const hashed = await bcrypt.hash(newPassword, this.saltRounds);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    this.otpStore.delete(email);
    return { message: 'Password has been reset successfully' };
  }
}
