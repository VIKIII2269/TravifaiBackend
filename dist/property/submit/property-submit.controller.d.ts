import { PropertySubmitService } from './property-submit.service';
export declare class PropertySubmitController {
    private readonly propertySubmitService;
    constructor(propertySubmitService: PropertySubmitService);
    submit(userId: string): Promise<{
        data: {
            id: string;
            status: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    approve(userId: string): Promise<{
        data: {
            id: string;
            status: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
