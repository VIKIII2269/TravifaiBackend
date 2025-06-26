// src/auth/dto/index.ts

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  Matches
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'VeryStrong@123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character',
  })
  password: string;

  @ApiProperty({ example: '+911234567890' })
  @IsPhoneNumber('IN')
  phone: string;

  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @ApiProperty({ example: 'HOTELIER/TRAVELLER'})
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'VeryStrong@123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character',
  })
  password: string;

  @ApiProperty({example: 'HOTELIER/TRAVELLER'})
  @IsEnum(Role)
  role: Role;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
  
  @ApiProperty({ example: 'VeryStrong@123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character',
  })
  newPassword: string;

  @ApiProperty({ example: 'VeryStrong@123' })
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
