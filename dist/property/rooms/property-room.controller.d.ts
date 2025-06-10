import { PropertyRoomsService } from './property-room.service';
import { CreatePropertyRoomDto } from './dto/property-room.dto';
import { S3Service } from '../../utils/s3.service';
export declare class PropertyRoomsController {
    private readonly propertyRoomsService;
    private readonly s3Service;
    constructor(propertyRoomsService: PropertyRoomsService, s3Service: S3Service);
    create(userId: string, createDto: CreatePropertyRoomDto, files: {
        uploadRoomImages?: Express.Multer.File[];
    }): Promise<{
        data: {
            amenities: string[];
            id: string;
            totalRooms: number;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            roomTypeName: string;
            floorNumber: number;
            roomType: string;
            bedType: string;
            roomView: string;
            smokingAllowed: boolean;
            extraBedAllowed: boolean;
            availabilityStart: Date;
            availabilityEnd: Date;
            baseAdult: number;
            maxAdult: number;
            maxChildren: number;
            maxOccupancy: number;
            baseRate: number;
            extraAdultCharge: number;
            childCharge: number;
            totalRoomsInProperty: number;
            uploadRoomImageUrls: string[];
        };
    }>;
    findAll(userId: string): Promise<{
        data: {
            amenities: string[];
            id: string;
            totalRooms: number;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            roomTypeName: string;
            floorNumber: number;
            roomType: string;
            bedType: string;
            roomView: string;
            smokingAllowed: boolean;
            extraBedAllowed: boolean;
            availabilityStart: Date;
            availabilityEnd: Date;
            baseAdult: number;
            maxAdult: number;
            maxChildren: number;
            maxOccupancy: number;
            baseRate: number;
            extraAdultCharge: number;
            childCharge: number;
            totalRoomsInProperty: number;
            uploadRoomImageUrls: string[];
        }[];
    }>;
}
