// src/property/info/dto/property-info.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContactDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  landline?: string;
}

class LocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pincode: string;
}

export class CreatePropertyInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hotelName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessOwnerName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ type: ContactDto })
  @ValidateNested()
  @Type(() => ContactDto)
  contact1: ContactDto;

  @ApiProperty({ type: ContactDto, required: false })
  @ValidateNested()
  @Type(() => ContactDto)
  @IsOptional()
  contact2?: ContactDto;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyRelationship: string;

  @ApiProperty()
  @IsBoolean()
  onLease: boolean;

  @ApiProperty()
  @IsNumber()
  totalRooms: number;

  @ApiProperty()
  @IsBoolean()
  registerOnOTAs: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  commissionPercentToOTAs?: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  uploadIntroVideo: any;
}

export class UpdatePropertyInfoDto extends CreatePropertyInfoDto {}
