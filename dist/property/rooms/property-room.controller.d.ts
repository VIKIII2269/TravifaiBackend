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
            id: string;
            userId: string;
            createdAt: Date;
            roomTypeName: string;
            floorNumber: number;
            totalRooms: number;
            roomType: string;
            bedType: string;
            roomView: string;
            smokingAllowed: boolean;
            extraBedAllowed: boolean;
            amenities: string[];
            baseAdult: number;
            maxAdult: number;
            maxChildren: number;
            maxOccupancy: number;
            baseRate: number;
            extraAdultCharge: number;
            childCharge: number;
            availabilityStart: Date;
            availabilityEnd: Date;
            totalRoomsInProperty: number;
            uploadRoomImageUrls: string[];
            updatedAt: Date;
        };
    }>;
    findAll(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            roomTypeName: string;
            floorNumber: number;
            totalRooms: number;
            roomType: string;
            bedType: string;
            roomView: string;
            smokingAllowed: boolean;
            extraBedAllowed: boolean;
            amenities: string[];
            baseAdult: number;
            maxAdult: number;
            maxChildren: number;
            maxOccupancy: number;
            baseRate: number;
            extraAdultCharge: number;
            childCharge: number;
            availabilityStart: Date;
            availabilityEnd: Date;
            totalRoomsInProperty: number;
            uploadRoomImageUrls: string[];
            updatedAt: Date;
        }[];
    }>;
}
