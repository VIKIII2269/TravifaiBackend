import { ApiProperty } from '@nestjs/swagger';

export class PropertySearchResultDto {
  @ApiProperty({ description: 'ID of the user (UUID)' })
  userId: string;

  @ApiProperty({ description: 'ID of the matching property (UUID)' })
  propertyId: string;

  @ApiProperty({ description: 'Name of the hotel/property' })
  hotelName: string;

  @ApiProperty({ description: 'Full location (city, state, country)' })
  location: string;

  @ApiProperty({ description: 'Type of the property' })
  propertyType: string;

  @ApiProperty({ type: String, description: 'Earliest available date (ISO string)' })
  earliestAvailability: Date;

  @ApiProperty({ description: 'Number of matching preference tags' })
  matchingPreferencesCount: number;
}
