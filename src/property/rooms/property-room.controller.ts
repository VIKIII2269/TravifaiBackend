// src/property/rooms/property-rooms.controller.ts
import { UpdatePropertyRoomDto } from './dto/update-property-room.dto';
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
  Patch,
  InternalServerErrorException,
  UploadedFile,
} from '@nestjs/common';
import { PropertyRoomsService } from './property-room.service';
import { CreatePropertyRoomDto } from './dto/property-room.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../utils/s3.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';
import { UploadDocumentDto } from '../documents/dto/documents.dto';

@ApiTags('Property Rooms')
@ApiBearerAuth('JWT')
@Controller('api/property/rooms')
export class PropertyRoomsController {
  constructor(
    private readonly propertyRoomsService: PropertyRoomsService,
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) { }

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
        availabilityStart: { type: 'string' },
        availabilityEnd: { type: 'string' },
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
    @Body() body: any,
    @UploadedFiles() files: { uploadRoomImages?: Express.Multer.File[] },
  ) {
    // Normalize amenities
    if (body.amenities && typeof body.amenities === 'string') {
      body.amenities = [body.amenities];
    }

    // Explicit number parsing
    const numericFields = [
      'floorNumber',
      'totalRooms',
      'baseAdult',
      'maxAdult',
      'maxChildren',
      'maxOccupancy',
      'baseRate',
      'extraAdultCharge',
      'childCharge',
      'totalRoomsInProperty',
    ];
    for (const field of numericFields) {
      if (body[field]) {
        body[field] = Number(body[field]);
      }
    }

    // Boolean parsing
    body.smokingAllowed = body.smokingAllowed === 'true' || body.smokingAllowed === true;
    body.extraBedAllowed = body.extraBedAllowed === 'true' || body.extraBedAllowed === true;

    // DTO transformation
    const createDto = plainToInstance(CreatePropertyRoomDto, body);

    let imageUrls: string[] = [];
    if (files?.uploadRoomImages?.length) {  // if it is more than 1
      try {
        const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
        const validFiles = files.uploadRoomImages.filter(file => validFormats.includes(file.mimetype));

        const uploads = await Promise.allSettled(
          validFiles.map(file => this.s3Service.uploadFile(file.buffer, file.originalname, 'room-images')),
        );

        imageUrls = uploads.filter(r => r.status === 'fulfilled').map((r: any) => r.value);
      } catch (err) {
        throw new InternalServerErrorException('Image upload failed');
      }
    }

    // const result = await this.propertyRoomsService.create(userId, createDto, imageUrls);
    const result = await this.prisma.$transaction(async (tx) => {
      return this.propertyRoomsService.create(userId, createDto, imageUrls, tx);
    });
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all room types for a user' })
  @ApiResponse({ status: 200, description: 'Rooms fetched.' })
  async findAll(@Param('userId') userId: string) {
    const rooms = await this.propertyRoomsService.findAllByUser(userId);
    return { data: rooms };
  }


  @Patch(':roomId')
  @ApiOperation({ summary: 'Update a room type (partial)' })
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
        availabilityStart: { type: 'string' },
        availabilityEnd: { type: 'string' },
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
  @ApiResponse({ status: 200, description: 'Room updated.' })
  async update(
    @Param('roomId') roomId: string,
    @Body() body: any,
    @UploadedFiles() files: { uploadRoomImages?: Express.Multer.File[] },
  ) {
    // Normalize amenities
    if (body.amenities && typeof body.amenities === 'string') {
      body.amenities = [body.amenities];
    }

    // Numeric fields parsing
    const numericFields = [
      'floorNumber',
      'totalRooms',
      'baseAdult',
      'maxAdult',
      'maxChildren',
      'maxOccupancy',
      'baseRate',
      'extraAdultCharge',
      'childCharge',
      'totalRoomsInProperty',
    ];
    for (const field of numericFields) {
      if (body[field] !== undefined) {
        body[field] = Number(body[field]);
      }
    }

    // Boolean parsing
    if (body.smokingAllowed !== undefined)
      body.smokingAllowed = body.smokingAllowed === 'true' || body.smokingAllowed === true;
    if (body.extraBedAllowed !== undefined)
      body.extraBedAllowed = body.extraBedAllowed === 'true' || body.extraBedAllowed === true;

    // DTO transformation
    const updateDto = plainToInstance(UpdatePropertyRoomDto, body);

    let imageUrls: string[] = [];
    if (files?.uploadRoomImages?.length) {
      const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
      // const validFiles = files.uploadRoomImages.filter(file => validFormats.includes(file.mimetype));

      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const validFiles = await files.uploadRoomImages.filter(file => {
        const mimetypeValid = validFormats.includes(file.mimetype);
        const nameValid = validExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));
        return mimetypeValid || nameValid;
      });

      console.log(validFiles.length);

      const uploadResults = await Promise.allSettled(
        validFiles.map(file => this.s3Service.uploadFile(file.buffer, file.originalname, 'room-images')),
      );

      imageUrls = uploadResults.filter(r => r.status === 'fulfilled').map((r: any) => r.value);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      return this.propertyRoomsService.update(roomId, updateDto, imageUrls, tx);
    });
    return { data: result };
  }

}
