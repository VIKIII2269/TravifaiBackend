import { PropertyStatusService } from './property-status.service';
export declare class PropertyStatusController {
    private readonly propertyStatusService;
    constructor(propertyStatusService: PropertyStatusService);
    getStatus(userId: string): Promise<{
        status: string;
    }>;
}
