import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsArray,
  Min,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPropertiesDto {
  @ApiPropertyOptional({ description: 'City of the property' })
  @IsString()
  @IsNotEmpty()
  city?: string;

  @ApiPropertyOptional({ description: 'State of the property' })
  @IsString()
  @IsNotEmpty()
  state?: string;

  @ApiPropertyOptional({ description: 'Country of the property' })
  @IsString()
  @IsNotEmpty()
  country?: string;

  @ApiPropertyOptional({ description: 'Check-in date (ISO 8601 format)' })
  @IsDate()
  // @IsISO8601()
  @Type(() => Date)
  @IsOptional()
  checkIn: Date;

  @ApiPropertyOptional({ description: 'Check-out date (ISO 8601 format)' })
  // @IsISO8601()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  checkOut: Date;
  
  @ApiPropertyOptional({ description: 'Number of rooms required', type: Number })
  @IsInt()
  @Min(1)
  @IsOptional()
  rooms: number;

  @ApiPropertyOptional({ description: 'Require travel agency connection', type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  needsAgency?: boolean;

  @ApiPropertyOptional({ description: 'Property type filter (e.g. Hotel, Apartment)' })
  @IsOptional()
  @IsString()
  propertyType?: string;

  @ApiPropertyOptional({ description: 'List of preferred nearby features', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];
}
