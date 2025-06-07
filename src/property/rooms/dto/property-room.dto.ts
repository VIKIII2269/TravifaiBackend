// src/property/rooms/dto/property-room.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AvailabilityDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class CreatePropertyRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomTypeName: string;

  @ApiProperty()
  @IsNumber()
  floorNumber: number;

  @ApiProperty()
  @IsNumber()
  totalRooms: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bedType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomView: string;

  @ApiProperty()
  @IsBoolean()
  smokingAllowed: boolean;

  @ApiProperty()
  @IsBoolean()
  extraBedAllowed: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({ type: AvailabilityDto })
  @ValidateNested()
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto;

  @ApiProperty()
  @IsNumber()
  baseAdult: number;

  @ApiProperty()
  @IsNumber()
  maxAdult: number;

  @ApiProperty()
  @IsNumber()
  maxChildren: number;

  @ApiProperty()
  @IsNumber()
  maxOccupancy: number;

  @ApiProperty()
  @IsNumber()
  baseRate: number;

  @ApiProperty()
  @IsNumber()
  extraAdultCharge: number;

  @ApiProperty()
  @IsNumber()
  childCharge: number;

  @ApiProperty()
  @IsNumber()
  totalRoomsInProperty: number;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  @IsOptional()
  uploadRoomImages: any[];
}
