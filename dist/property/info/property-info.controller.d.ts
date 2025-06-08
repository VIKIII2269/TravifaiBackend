import { PropertyInfoService } from './property-info.service';
import { CreatePropertyInfoDto } from './dto/property-info.dto';
import { S3Service } from '../../utils/s3.service';
export declare class PropertyInfoController {
    private readonly propertyInfoService;
    private readonly s3Service;
    constructor(propertyInfoService: PropertyInfoService, s3Service: S3Service);
    create(userId: string, createDto: CreatePropertyInfoDto, file: Express.Multer.File): Promise<{
        data: {
            id: string;
            hotelName: string;
            businessOwnerName: string;
            designation: string;
            propertyType: string;
            propertyRelationship: string;
            onLease: boolean;
            totalRooms: number;
            registerOnOTAs: boolean;
            commissionPercentToOTAs: number | null;
            userId: string;
            contact1Phone: string;
            contact1Email: string;
            contact1Landline: string | null;
            contact2Phone: string | null;
            contact2Email: string | null;
            contact2Landline: string | null;
            locationLocality: string;
            locationStreet: string;
            locationCity: string;
            locationState: string;
            locationCountry: string;
            locationPincode: string;
            uploadIntroVideoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            hotelName: string;
            businessOwnerName: string;
            designation: string;
            propertyType: string;
            propertyRelationship: string;
            onLease: boolean;
            totalRooms: number;
            registerOnOTAs: boolean;
            commissionPercentToOTAs: number | null;
            userId: string;
            contact1Phone: string;
            contact1Email: string;
            contact1Landline: string | null;
            contact2Phone: string | null;
            contact2Email: string | null;
            contact2Landline: string | null;
            locationLocality: string;
            locationStreet: string;
            locationCity: string;
            locationState: string;
            locationCountry: string;
            locationPincode: string;
            uploadIntroVideoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
