// src/property/rooms/property-rooms.module.ts

import { Module } from '@nestjs/common';
import { PropertyRoomsService } from './property-rooms.service';
import { PropertyRoomsController } from './property-rooms.controller';
import { PrismaService } from '../../prisma.service';
import { S3Service } from '../../utils/s3.service';

@Module({
  controllers: [PropertyRoomsController],
  providers: [PropertyRoomsService, PrismaService, S3Service],
})
export class PropertyRoomsModule {}
