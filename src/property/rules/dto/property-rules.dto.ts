// src/property/rules/dto/property-rules.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropertyRulesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coupleRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guestRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identityRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  petRule: string;
}

export class UpdatePropertyRulesDto extends CreatePropertyRulesDto {}
