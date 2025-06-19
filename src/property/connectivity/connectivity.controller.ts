// src/property/connectivity/connectivity.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ConnectivityService } from './connectivity.service';
import { CreateConnectivityDto } from './dto/connectivity.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { UpdateConnectivityDto } from './dto/update-connectivity.dto';

@ApiTags('Connectivity Partners')
@ApiBearerAuth('JWT')
@Controller('api/property/connectivity')
export class ConnectivityController {
  constructor(private readonly connectivityService: ConnectivityService) { }

  @Post()
  @ApiOperation({ summary: 'Create or update connectivity info' })
  @ApiResponse({ status: 201, description: 'Connectivity info created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreateConnectivityDto,
  ) {
    const result = await this.connectivityService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get connectivity info by user ID' })
  @ApiResponse({ status: 200, description: 'Connectivity info fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.connectivityService.getByUser(userId);
    return { data: result };
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update connectivity info (partial)' })
  @ApiResponse({ status: 200, description: 'Connectivity info updated.' })
  async update(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateConnectivityDto,
  ) {
    const result = await this.connectivityService.update(userId, updateDto);
    return { data: result };
  }

}
