// src/property/rooms/property-rooms.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PropertyRoomsService } from './property-room.service';
import { CreatePropertyRoomDto } from './dto/property-room.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../utils/s3.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('Property Rooms')
@ApiBearerAuth('JWT')
@Controller('api/property/rooms')
export class PropertyRoomsController {
  constructor(
    private readonly propertyRoomsService: PropertyRoomsService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a room type for the property' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roomTypeName: { type: 'string' },
        floorNumber: { type: 'number' },
        totalRooms: { type: 'number' },
        roomType: { type: 'string' },
        bedType: { type: 'string' },
        roomView: { type: 'string' },
        smokingAllowed: { type: 'boolean' },
        extraBedAllowed: { type: 'boolean' },
        amenities: { type: 'array', items: { type: 'string' } },
        availabilityStart: { type: 'string', format: 'date-time' },
        availabilityEnd: { type: 'string', format: 'date-time' },
        baseAdult: { type: 'number' },
        maxAdult: { type: 'number' },
        maxChildren: { type: 'number' },
        maxOccupancy: { type: 'number' },
        baseRate: { type: 'number' },
        extraAdultCharge: { type: 'number' },
        childCharge: { type: 'number' },
        totalRoomsInProperty: { type: 'number' },
        uploadRoomImages: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'uploadRoomImages', maxCount: 5 }]))
  @ApiResponse({ status: 201, description: 'Room created.' })
  async create(
    @UserId() userId: string,
    @Body() createDto: CreatePropertyRoomDto,
    @UploadedFiles() files: { uploadRoomImages?: Express.Multer.File[] },
  ) {
    let imageUrls: string[] = [];
    if (files?.uploadRoomImages?.length) {
      const uploads = await Promise.all(
        files.uploadRoomImages.map((file) =>
          this.s3Service.uploadFile(file.buffer, file.originalname, 'room-images'),
        ),
      );
      imageUrls = uploads;
    }
    const result = await this.propertyRoomsService.create(userId, createDto, imageUrls);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all room types for a user' })
  @ApiResponse({ status: 200, description: 'Rooms fetched.' })
  async findAll(@Param('userId') userId: string) {
    const rooms = await this.propertyRoomsService.findAllByUser(userId);
    return { data: rooms };
  }
}
