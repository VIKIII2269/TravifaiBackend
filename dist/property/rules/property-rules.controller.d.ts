import { PropertyRulesService } from './property-rules.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';
export declare class PropertyRulesController {
    private readonly propertyRulesService;
    constructor(propertyRulesService: PropertyRulesService);
    create(userId: string, dto: CreatePropertyRulesDto): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            coupleRule: string;
            guestRule: string;
            identityRule: string;
            petRule: string;
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            coupleRule: string;
            guestRule: string;
            identityRule: string;
            petRule: string;
        };
    }>;
}
