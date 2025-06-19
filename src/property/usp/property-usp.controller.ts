// src/property/usp/property-usp.controller.ts

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PropertyUspService } from './property-usp.service';
import { CreatePropertyUspDto } from './dto/property-usp.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { UpdatePropertyUspDto } from './dto/update-property-usp.dto';

@ApiTags('Property USP')
@ApiBearerAuth('JWT')
@Controller('api/property/usp')
export class PropertyUspController {
  constructor(private readonly propertyUspService: PropertyUspService) { }

  @Post()
  @ApiOperation({ summary: 'Create or update property USP' })
  @ApiResponse({ status: 201, description: 'Property USP created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreatePropertyUspDto,
  ) {
    const result = await this.propertyUspService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get property USP by user ID' })
  @ApiResponse({ status: 200, description: 'Property USP fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.propertyUspService.getByUser(userId);
    return { data: result };
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update property USP (partial)' })
  @ApiResponse({ status: 200, description: 'Property USP updated.' })
  async update(
    @Param('userId') userId: string,
    @Body() dto: UpdatePropertyUspDto,
  ) {
    const result = await this.propertyUspService.update(userId, dto);
    return { data: result };
  }
}
