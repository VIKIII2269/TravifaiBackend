import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HomepageService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getAllProperties() {
        const users = await this.prisma.user.findMany({
            include: {
                propertyInfo: true,
                propertyRooms: true,
            }
        });

        console.log(users.length);

        return users.map(user => ({
            propertyId: user.propertyInfo?.id,
            hotelName: user.propertyInfo?.hotelName,
            location: {
                city: user.propertyInfo?.locationCity,
                state: user.propertyInfo?.locationState,
                country: user.propertyInfo?.locationCountry,
            },
            propertyType: user.propertyInfo?.propertyType,
            uploadIntroVideoIrl: user.propertyInfo?.uploadIntroVideoUrl,
            roomType: user.propertyRooms.map(room => ({
                roomtypeNames: room.roomTypeName,
                baseRate: room.baseRate,
                roomView: room.roomView,
                bedType: room.bedType,
                amenities: room.amenities,
                uploadRoomImageUrls: room.uploadRoomImageUrls,
            })),
        }));
    }
}
