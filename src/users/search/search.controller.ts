import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { FilterPropertiesDto } from './dto/filter-properties.dto';
import { PropertySearchResultDto } from './dto/property-search-result.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Property Search')
@ApiBearerAuth('JWT')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Search properties by various criteria' })
  @ApiOkResponse({ type: PropertySearchResultDto, isArray: true })
  async search(@Query() filterDto: FilterPropertiesDto): Promise<PropertySearchResultDto[]> {
    return this.searchService.searchProperties(filterDto);
  }
}
