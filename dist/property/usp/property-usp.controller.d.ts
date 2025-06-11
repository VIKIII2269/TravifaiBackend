import { PropertyUspService } from './property-usp.service';
import { CreatePropertyUspDto } from './dto/property-usp.dto';
export declare class PropertyUspController {
    private readonly propertyUspService;
    constructor(propertyUspService: PropertyUspService);
    create(userId: string, dto: CreatePropertyUspDto): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            ageOfProperty: number;
            historicalEventAvailable: boolean;
            historicalEventDesc: string | null;
            propertyOwnerDescription: string;
            nearbyPlaces: string[];
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            ageOfProperty: number;
            historicalEventAvailable: boolean;
            historicalEventDesc: string | null;
            propertyOwnerDescription: string;
            nearbyPlaces: string[];
        };
    }>;
}
