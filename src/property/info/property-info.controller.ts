// src/property/info/property-info.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PropertyInfoService } from './property-info.service';
import { CreatePropertyInfoDto } from './dto/property-info.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../utils/s3.service';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('Property Information')
@ApiBearerAuth('JWT')
@Controller('api/property/info')
export class PropertyInfoController {
  constructor(
    private readonly propertyInfoService: PropertyInfoService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create or update property information' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hotelName: { type: 'string' },
        businessOwnerName: { type: 'string' },
        designation: { type: 'string' },
        contact1: { type: 'object' },
        contact2: { type: 'object' },
        location: { type: 'object' },
        propertyType: { type: 'string' },
        propertyRelationship: { type: 'string' },
        onLease: { type: 'boolean' },
        totalRooms: { type: 'number' },
        registerOnOTAs: { type: 'boolean' },
        commissionPercentToOTAs: { type: 'number' },
        uploadIntroVideo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('uploadIntroVideo'))
  @ApiResponse({ status: 201, description: 'Property info created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() createDto: CreatePropertyInfoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let videoUrl: string = null;
    if (file) {
      videoUrl = await this.s3Service.uploadFile(file.buffer, file.originalname, 'intro-videos');
    }
    const result = await this.propertyInfoService.createOrUpdate(userId, createDto, videoUrl);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get property information by user ID' })
  @ApiResponse({ status: 200, description: 'Property info fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.propertyInfoService.getByUser(userId);
    return { data: result };
  }
}
