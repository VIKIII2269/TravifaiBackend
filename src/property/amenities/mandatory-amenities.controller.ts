// src/property/amenities/mandatory-amenities.controller.ts

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { MandatoryAmenitiesService } from './mandatory-amenities.service';
import { CreateMandatoryAmenitiesDto } from './dto/mandatory-amenities.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { UpdateMandatoryAmenitiesDto } from './dto/update-mandatory-amenities.dto';

@ApiTags('Mandatory Amenities Toggles')
@ApiBearerAuth('JWT')
@Controller('api/property/amenities/mandatory')
export class MandatoryAmenitiesController {
  constructor(private readonly mandatoryAmenitiesService: MandatoryAmenitiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create or update mandatory amenities' })
  @ApiResponse({ status: 201, description: 'Mandatory amenities created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreateMandatoryAmenitiesDto,
  ) {
    const result = await this.mandatoryAmenitiesService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get mandatory amenities by user ID' })
  @ApiResponse({ status: 200, description: 'Mandatory amenities fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.mandatoryAmenitiesService.getByUser(userId);
    return { data: result };
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update mandatory amenities (partial)' })
  @ApiResponse({ status: 200, description: 'Mandatory amenities updated.' })
  async update(
    @Param('userId') userId: string,
    @Body() dto: UpdateMandatoryAmenitiesDto,
  ) {
    const result = await this.mandatoryAmenitiesService.update(userId, dto);
    return { data: result };
  }
  
}
