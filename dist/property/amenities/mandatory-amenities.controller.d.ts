import { MandatoryAmenitiesService } from './mandatory-amenities.service';
import { CreateMandatoryAmenitiesDto } from './dto/mandatory-amenities.dto';
export declare class MandatoryAmenitiesController {
    private readonly mandatoryAmenitiesService;
    constructor(mandatoryAmenitiesService: MandatoryAmenitiesService);
    create(userId: string, dto: CreateMandatoryAmenitiesDto): Promise<{
        data: {
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
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
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
        };
    }>;
}
