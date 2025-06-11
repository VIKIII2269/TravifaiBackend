import { PrismaService } from '../../prisma.service';
import { CreatePropertyUspDto } from './dto/property-usp.dto';
export declare class PropertyUspService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreatePropertyUspDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        ageOfProperty: number;
        historicalEventAvailable: boolean;
        historicalEventDesc: string | null;
        propertyOwnerDescription: string;
        nearbyPlaces: string[];
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        ageOfProperty: number;
        historicalEventAvailable: boolean;
        historicalEventDesc: string | null;
        propertyOwnerDescription: string;
        nearbyPlaces: string[];
    }>;
}
