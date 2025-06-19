import { Module } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ReelsController } from './reels.controller';
import { S3Service } from 'src/utils/s3.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReelsController],
  providers: [ReelsService, S3Service, PrismaService],
})
export class ReelsModule {}
