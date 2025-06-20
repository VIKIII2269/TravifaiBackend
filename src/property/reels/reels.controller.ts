import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReelsService } from './reels.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('Hotel Video')
@Controller('api/property/reels')
@ApiBearerAuth('JWT')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}
  @ApiOperation({ summary: 'Upload video of your hotel after logging in.' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  async uploadHotelVideo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = (req.user as any)['userId'];
    return this.reelsService.uploadHotelVideo(file, userId);
  }
  @ApiOperation({ summary: 'Get those videos by id' })
  @Get(':id')
  async getHotelVideos(@Param('id') propertyId: string) {
    return this.reelsService.getHotelVideos(propertyId);
  }
}
