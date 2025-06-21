// src/subscription/subscription.controller.ts

import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
@ApiBearerAuth('JWT')
@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':hotelId')
  @ApiOperation({ summary: 'Get subscription details by hotel ID' })
  @ApiParam({ name: 'hotelId', type: String })
  async getSubscriptionStatus(@Param('hotelId') hotelId: string) {
    const data = await this.subscriptionService.findByHotelId(hotelId);
    if (!data) {
      throw new NotFoundException('Subscription not found for this hotel');
    }
    return {
      submitted: data.submitted,
      approved: data.approved,
      subscribed: data.subscribed,
      recommended: data.recommended,
    };
  }
}
