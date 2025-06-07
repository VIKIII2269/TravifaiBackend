import { PrismaService } from '../../prisma.service';
import { CreateMandatoryAmenitiesDto } from './dto/mandatory-amenities.dto';
export declare class MandatoryAmenitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreateMandatoryAmenitiesDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        airConditioning: boolean;
        laundry: boolean;
        newspaper: boolean;
        parking: boolean;
        roomService: boolean;
        smokeDetector: boolean;
        smokingRooms: boolean;
        swimmingPools: boolean;
        wifi: boolean;
        lounge: boolean;
        reception: boolean;
        bar: boolean;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        airConditioning: boolean;
        laundry: boolean;
        newspaper: boolean;
        parking: boolean;
        roomService: boolean;
        smokeDetector: boolean;
        smokingRooms: boolean;
        swimmingPools: boolean;
        wifi: boolean;
        lounge: boolean;
        reception: boolean;
        bar: boolean;
    }>;
}
