import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReelsService } from './reels.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Hotel Video')
@Controller('api/property/reels')
@ApiBearerAuth('JWT')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  async uploadHotelVideo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = (req.user as any)['userId']; 
    return this.reelsService.uploadHotelVideo(file, userId);
  }

  @Get(':id') 
  async getHotelWithVideo(@Param('id') id: string) {
    return this.reelsService.getHotelWithVideo(id);
  }
}
