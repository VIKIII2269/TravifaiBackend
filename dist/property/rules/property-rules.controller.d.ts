import { PropertyRulesService } from './property-rules.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';
export declare class PropertyRulesController {
    private readonly propertyRulesService;
    constructor(propertyRulesService: PropertyRulesService);
    create(userId: string, dto: CreatePropertyRulesDto): Promise<{
        data: {
            id: string;
            userId: string;
            coupleRule: string;
            guestRule: string;
            otherRule: string;
            petRule: string;
            checkInTime: string;
            checkOutTime: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            coupleRule: string;
            guestRule: string;
            otherRule: string;
            petRule: string;
            checkInTime: string;
            checkOutTime: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
