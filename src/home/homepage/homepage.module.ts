import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HomepageController],
  providers: [HomepageService, PrismaService]
})
export class HomepageModule {}
