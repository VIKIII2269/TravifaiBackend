"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.saltRounds = 10;
        this.otpStore = new Map();
        const port = process.env.EMAIL_PORT
            ? parseInt(process.env.EMAIL_PORT, 10)
            : 587;
        this.mailTransporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async signup(dto) {
        const { email, password, phone, username } = dto;
        const [existingByEmail, existingByPhone, existingByUsername] = await Promise.all([
            this.prisma.user.findUnique({ where: { email } }),
            this.prisma.user.findUnique({ where: { phone } }),
            this.prisma.user.findUnique({ where: { username } }),
        ]);
        if (existingByEmail) {
            throw new common_1.BadRequestException('Email is already registered');
        }
        if (existingByPhone) {
            throw new common_1.BadRequestException('Phone number is already registered');
        }
        if (existingByUsername) {
            throw new common_1.BadRequestException('Username is already taken');
        }
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        const createdUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                phone,
                username,
            },
        });
        const token = this.jwtService.sign({
            sub: createdUser.id,
            email: createdUser.email,
        });
        return { access_token: token };
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
        return { access_token: token };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('No user found with this email');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otpStore.set(email, otp);
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP to reset password is: ${otp}. It will expire in 10 minutes.`,
        };
        await this.mailTransporter.sendMail(mailOptions);
        return { message: 'OTP sent to your email address' };
    }
    async resetPassword(email, otp, newPassword) {
        const storedOtp = this.otpStore.get(email);
        if (!storedOtp || storedOtp !== otp) {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        const hashed = await bcrypt.hash(newPassword, this.saltRounds);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashed },
        });
        this.otpStore.delete(email);
        return { message: 'Password has been reset successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map