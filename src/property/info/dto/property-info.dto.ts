import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContactDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  landline?: string;
}

export class LocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locality!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pincode!: string;
}

export class CreatePropertyInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hotelName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessOwnerName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation!: string;

  @ApiProperty({ type: () => ContactDto })
  @IsObject()                // ensure it’s an object before nested validation
  @ValidateNested()
  @Type(() => ContactDto)
  contact1!: ContactDto;

  @ApiProperty({ type: () => ContactDto, required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact2?: ContactDto;

  @ApiProperty({ type: () => LocationDto })
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyRelationship!: string;

  @ApiProperty()
  @IsBoolean()
  onLease!: boolean;

  @ApiProperty()
  @IsNumber()
  totalRooms!: number;

  @ApiProperty()
  @IsBoolean()
  registerOnOTAs!: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  commissionPercentToOTAs?: number;

  // Handled via @UploadedFile in controller
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  uploadIntroVideo?: any;
}

export class UpdatePropertyInfoDto extends CreatePropertyInfoDto {}
