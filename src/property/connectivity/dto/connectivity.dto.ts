// src/property/connectivity/dto/connectivity.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsPhoneNumber, isPhoneNumber, IsString } from 'class-validator';

export class CreateConnectivityDto {
  @ApiProperty()
  @IsBoolean()
  channelManagerUsed: boolean;

  @ApiProperty()
  @IsBoolean()
  connectedWithTravelAgency: boolean;

  @ApiProperty()
  @IsString()
  channelManagerName:string;

  @ApiProperty()
  @IsPhoneNumber()
  travelAgencyContact: string;

  @ApiProperty()
  @IsString()
  travelAgencyName:string;
}

