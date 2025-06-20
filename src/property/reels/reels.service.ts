import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from 'src/utils/s3.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReelsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  async uploadHotelVideo(file: Express.Multer.File, userId: string) {
    const hotel = await this.prisma.propertyInfo.findUnique({
      where: { userId },
    });

    if (!hotel) throw new NotFoundException('Hotel not found');

    const videoUrl = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
      'hotel_reels',
    );

    const video = await this.prisma.hotelVideo.create({
      data: {
        propertyId: hotel.id,
        videoUrl,
      },
    });

    return { message: 'Video uploaded successfully', video };
  }

  async getHotelVideos(propertyId: string) {
    const hotel = await this.prisma.propertyInfo.findUnique({
      where: { id: propertyId },
    });

    if (!hotel) throw new NotFoundException('Hotel not found');

    const videos = await this.prisma.hotelVideo.findMany({
      where: { propertyId },
      orderBy: { createdAt: 'desc' },
    });

    if (!videos.length) {
      return {
        propertyId,
        hotelName: hotel.hotelName,
        message: 'No videos uploaded yet',
      };
    }

    return {
      propertyId,
      hotelName: hotel.hotelName,
      videos,
    };
  }
}
