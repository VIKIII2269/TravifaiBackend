import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from 'src/utils/s3.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReelsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  async uploadHotelVideo(file: Express.Multer.File, Id: string) {
    const hotel = await this.prisma.propertyInfo.findUnique({
      where: { userId: Id },
    });

    if (!hotel) throw new NotFoundException('Hotel not found');

    const videoUrl = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
      'hotel_reels',
    );

    await this.prisma.propertyInfo.update({
      where: { userId: Id },
      data: { uploadIntroVideoUrl: videoUrl }, // ✅ updated field name
    });

    return { message: 'Video uploaded', videoUrl };
  }
  async getHotelWithVideo(Id: string) {
    const hotel = await this.prisma.propertyInfo.findUnique({
        where: { userId: Id },
        select: {
        id: true,
        hotelName: true,
        uploadIntroVideoUrl: true,
        },
    });

    if (!hotel) throw new NotFoundException('Hotel not found');

    if (!hotel.uploadIntroVideoUrl) {
        return {
        ...hotel,
        message: 'Intro video not uploaded yet',
        };
    }

    return hotel;
    }
}
