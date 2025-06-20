import { Controller, Get, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Home Page')
@ApiBearerAuth('JWT')
@Controller('homepage')
export class HomepageController {
    constructor(private readonly homepageService: HomepageService) {}
    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'List out all the registered properties', description: 'All the registered properties'})
    @Get('properties')
    @ApiOkResponse({isArray: true})
    getAllProperties() {
        return this.homepageService.getAllProperties();
    }
}
