// src/auth/dto/index.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'veryStrongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+911234567890' })
  @IsPhoneNumber('IN')
  phone: string;

  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @ApiProperty({ example: 'hotelier'})
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'veryStrongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({example: 'traveller'})
  @IsEnum(Role)
  role: Role;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiProperty({ example: 'newStrongPassword456' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
