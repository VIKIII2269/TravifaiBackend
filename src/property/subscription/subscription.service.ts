// src/subscription/subscription.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async findByHotelId(hotelId: string) {
    return this.prisma.subscription.findUnique({
      where: { hotelId },
    });
  }

  async updateStatus(userId: string, status: Partial<{ submitted: boolean; approved: boolean; subscribed: boolean; recommended: boolean }>) {
    return this.prisma.subscription.update({
      where: { userId },
      data: status,
    });
  }
}
