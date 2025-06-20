import { Injectable } from '@nestjs/common';
import { FilterPropertiesDto } from './dto/filter-properties.dto';
import { PropertySearchResultDto } from './dto/property-search-result.dto';
import { PropertyRoom } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  // async searchProperties(filter: FilterPropertiesDto): Promise<PropertySearchResultDto[]> {
  //   const {
  //     city,
  //     state,
  //     country,
  //     checkIn,
  //     checkOut,
  //     rooms,
  //     needsAgency = false,
  //     propertyType,
  //     preferences = [],
  //   } = filter;

  //   const properties = await this.prisma.user.findMany({
  //     where: {
  //       propertyInfo: {
  //         locationCity: city,
  //         locationState: state,
  //         locationCountry: country,
  //         ...(propertyType ? { propertyType } : {}),
  //       },
  //       ...(needsAgency
  //         ? {
  //             connectivity: {
  //               connectedWithTravelAgency: true,
  //             },
  //           }
  //         : {}),
  //     },
  //     include: {
  //       propertyInfo: true,
  //       connectivity: true,
  //       propertyRooms: true,
  //       usp: true,
  //     },
  //   });

  //   const results: PropertySearchResultDto[] = [];

  //   for (const prop of properties) {
  //     if (!prop.propertyInfo || !prop.propertyRooms) continue;

  //     const availableRoom = prop.propertyRooms.find((room: PropertyRoom) => {
  //       return (
  //         room.availabilityStart <= checkIn.toISOString() &&
  //         room.availabilityEnd >= checkOut.toISOString() &&
  //         room.totalRooms >= rooms
  //       );
  //     });

  //     if (!availableRoom) continue;

  //     const earliestAvailability = new Date(checkIn);

  //     const nearbyPlaces = prop.usp?.nearbyPlaces || [];
  //     const matchCount = preferences.filter((pref) =>
  //       nearbyPlaces.includes(pref),
  //     ).length;

  //     const fullLocation = `${prop.propertyInfo.locationCity}, ${prop.propertyInfo.locationState}, ${prop.propertyInfo.locationCountry}`;

  //     results.push({
  //       userId: prop.id,
  //       propertyId: prop.propertyInfo.id,
  //       hotelName: prop.propertyInfo.hotelName,
  //       location: fullLocation,
  //       propertyType: prop.propertyInfo.propertyType,
  //       earliestAvailability,
  //       matchingPreferencesCount: matchCount,
  //     });
  //   }

  //   results.sort((a, b) => {
  //     const dateDiff =
  //       a.earliestAvailability.getTime() - b.earliestAvailability.getTime();
  //     if (dateDiff !== 0) return dateDiff;
  //     return b.matchingPreferencesCount - a.matchingPreferencesCount;
  //   });
  //   return results;
  // }
  async searchProperties(filter: FilterPropertiesDto): Promise<PropertySearchResultDto[]> {
  const {
    city,
    state,
    country,
    checkIn,
    checkOut,
    rooms,
    needsAgency = false,
    propertyType,
    preferences = [],
  } = filter;

  const properties = await this.prisma.user.findMany({
    where: {
      propertyInfo: {
        locationCity: city
          ? { equals: city, mode: 'insensitive' }
          : undefined,
        locationState: state
          ? { equals: state, mode: 'insensitive' }
          : undefined,
        locationCountry: country
          ? { equals: country, mode: 'insensitive' }
          : undefined,
        ...(propertyType
          ? {
              propertyType: { equals: propertyType, mode: 'insensitive' },
            }
          : {}),
      },
      ...(needsAgency
        ? {
            connectivity: {
              connectedWithTravelAgency: true,
            },
          }
        : {}),
    },
    include: {
      propertyInfo: true,
      connectivity: true,
      propertyRooms: true,
      usp: true,
    },
  });

  const results: PropertySearchResultDto[] = [];

  for (const prop of properties) {
    if (!prop.propertyInfo || !prop.propertyRooms) continue;

    const availableRoom = prop.propertyRooms.find((room: PropertyRoom) => {
      return (
        new Date(room.availabilityStart) <= checkIn &&
        new Date(room.availabilityEnd) >= checkOut &&
        room.totalRooms >= rooms
      );
    });

    if (!availableRoom) continue;

    const earliestAvailability = new Date(checkIn);

    const nearbyPlaces = prop.usp?.nearbyPlaces?.map(p => p.toLowerCase()) || [];
    const matchCount = preferences.filter((pref) =>
      nearbyPlaces.includes(pref.toLowerCase()),
    ).length;
    
    const fullLocation = `${prop.propertyInfo.locationCity}, ${prop.propertyInfo.locationState}, ${prop.propertyInfo.locationCountry}`;

    results.push({
      userId: prop.id,
      propertyId: prop.propertyInfo.id,
      hotelName: prop.propertyInfo.hotelName,
      location: fullLocation,
      propertyType: prop.propertyInfo.propertyType,
      earliestAvailability,
      matchingPreferencesCount: matchCount,
    });
  }

  results.sort((a, b) => {
    const dateDiff = a.earliestAvailability.getTime() - b.earliestAvailability.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.matchingPreferencesCount - a.matchingPreferencesCount;
  });

  return results;
}

}
