import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PropertySubmitService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(userId: string) {
    const existingStatus = await this.prisma.propertyStatus.findUnique({ where: { userId } });

    const info = await this.prisma.propertyInfo.findUnique({ where: { userId } });
    const rooms = await this.prisma.propertyRoom.findMany({ where: { userId } });
    const connectivity = await this.prisma.connectivity.findUnique({ where: { userId } });
    const usp = await this.prisma.propertyUSP.findUnique({ where: { userId } });
    const amenities = await this.prisma.amenities.findUnique({ where: { userId } });
    const mandatoryAmenities = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
    const documents = await this.prisma.document.findMany({ where: { userId } });
    const rules = await this.prisma.propertyRules.findUnique({ where: { userId } });

    if (!info || rooms.length === 0 || !connectivity || !usp || !amenities || !mandatoryAmenities || documents.length === 0 || !rules) {
      throw new BadRequestException('All sections must be completed before submission');
    }

    const now = new Date();
    if (existingStatus && existingStatus.status !== 'draft') {
      throw new BadRequestException(`Cannot submit. Current status is "${existingStatus.status}"`);
    }

    // Generate next submitted hotelId like "S0001"
    const last = await this.prisma.subscription.findMany({
      where: { hotelId: { startsWith: 'S' } },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    let nextNum = 1;
    if (last.length && last[0].hotelId) {
      const match = last[0].hotelId.match(/^S(\d{4})$/);
      if (match) nextNum = parseInt(match[1]) + 1;
    }

    const newHotelId = `S${String(nextNum).padStart(4, '0')}`;

    // Update subscription
    await this.prisma.subscription.upsert({
      where: { userId },
      update: { submitted: true, hotelId: newHotelId },
      create: {
        userId,
        submitted: true,
        hotelId: newHotelId,
      },
    });

    // Update PropertyInfo with hotelId
    await this.prisma.propertyInfo.update({
      where: { userId },
      data: { hotelId: newHotelId },
    });

    if (existingStatus) {
      return this.prisma.propertyStatus.update({
        where: { userId },
        data: { status: 'submitted', updatedAt: now },
      });
    }

    return this.prisma.propertyStatus.create({
      data: {
        userId,
        status: 'submitted',
      },
    });
  }

  async simulateApproval(userId: string) {
    const statusRecord = await this.prisma.propertyStatus.findUnique({ where: { userId } });
    if (!statusRecord) throw new NotFoundException('Property not found. Cannot approve.');

    const submittedAt = statusRecord.updatedAt;
    const now = new Date();
    const diffHours = (now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60);

    if (statusRecord.status !== 'submitted') {
      throw new BadRequestException(`Cannot approve. Current status is "${statusRecord.status}"`);
    }
    if (diffHours < 48) {
      throw new BadRequestException('Approval can only be simulated after 48 hours of submission.');
    }

    const subscription = await this.prisma.subscription.findUnique({ where: { userId } });
    if (!subscription || !subscription.hotelId?.startsWith('S')) {
      throw new BadRequestException('Invalid hotelId. Submission not found.');
    }

    const serial = subscription.hotelId.substring(1);
    const approvedHotelId = `A${serial.padStart(4, '0')}`;

    // Update subscription with approved hotelId
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        approved: true,
        hotelId: approvedHotelId,
      },
    });

    // Update propertyInfo with new hotelId
    await this.prisma.propertyInfo.update({
      where: { userId },
      data: {
        hotelId: approvedHotelId,
      },
    });

    return this.prisma.propertyStatus.update({
      where: { userId },
      data: { status: 'approved', updatedAt: now },
    });
  }
}
