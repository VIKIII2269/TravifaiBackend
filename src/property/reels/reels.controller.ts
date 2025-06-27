  import {
    Controller,
    Post,
    Get,
    Param,
    Req,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ReelsService } from './reels.service';
  import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
  import { Request } from 'express';
  import { ApiOperation } from '@nestjs/swagger';

  @ApiTags('Hotel Video')
  @Controller('api/property/reels')
  @ApiBearerAuth('JWT')
  export class ReelsController {
    constructor(private readonly reelsService: ReelsService) { }
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
    @ApiOperation({ summary: 'Get Hotel videos in a paginated way' })
    @ApiQuery({ name: "cursor", required: false, type: String })
    @ApiQuery({ name: "take", required: false, type: Number, example: 5 })
    @Get(':id')
    async getHotelVideos(
      @Param('id') propertyId: string,
      @Query('cursor') cursor?: string,
      @Query('take') take?: string,
    ) {
      return this.reelsService.getHotelVideos(propertyId, cursor, parseInt(take ?? '5'));
    }
  }
