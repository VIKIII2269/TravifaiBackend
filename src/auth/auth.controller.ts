// src/auth/auth.controller.ts

import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  SignupDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignupDto })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email & password' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset OTP' })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('verify-otp')
@ApiOperation({ summary: 'Verify OTP before password reset' })
@ApiBody({ type: VerifyOtpDto })
async verifyOtp(@Body() dto: VerifyOtpDto) {
  return this.authService.verifyOtp(dto.email, dto.otp);
}

  @Post('reset-password')
@ApiOperation({ summary: 'Reset password (after OTP verification)' })
@ApiBody({ type: ResetPasswordDto })
async resetPassword(@Body() dto: ResetPasswordDto) {
  if (dto.newPassword !== dto.confirmPassword) {
    throw new BadRequestException('Passwords do not match');
  }
  return this.authService.resetPassword(dto.email, dto.newPassword);
}
}
