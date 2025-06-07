import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesDto } from './dto/amenities.dto';
export declare class AmenitiesController {
    private readonly amenitiesService;
    constructor(amenitiesService: AmenitiesService);
    create(userId: string, dto: CreateAmenitiesDto): Promise<{
        data: {
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
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
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
        };
    }>;
}
