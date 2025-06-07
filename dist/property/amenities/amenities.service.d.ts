import { PrismaService } from '../../prisma.service';
import { CreateAmenitiesDto } from './dto/amenities.dto';
export declare class AmenitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreateAmenitiesDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        mandatory: string[];
        basicFacilities: string[];
        generalServices: string[];
        outdoorActivities: string[];
        commonAreas: string[];
        foodAndDrink: string[];
        healthWellness: string[];
        businessCenter: string[];
        beautyAndSpa: string[];
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        mandatory: string[];
        basicFacilities: string[];
        generalServices: string[];
        outdoorActivities: string[];
        commonAreas: string[];
        foodAndDrink: string[];
        healthWellness: string[];
        businessCenter: string[];
        beautyAndSpa: string[];
    }>;
}
