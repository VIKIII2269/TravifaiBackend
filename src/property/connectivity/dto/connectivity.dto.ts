// src/property/connectivity/dto/connectivity.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreateConnectivityDto {
  @ApiProperty()
  @IsBoolean()
  channelManagerUsed: boolean;

  @ApiProperty()
  @IsBoolean()
  connectedWithTravelAgency: boolean;
}

export class UpdateConnectivityDto extends CreateConnectivityDto {}
