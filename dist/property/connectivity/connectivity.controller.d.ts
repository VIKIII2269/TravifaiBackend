import { ConnectivityService } from './connectivity.service';
import { CreateConnectivityDto } from './dto/connectivity.dto';
export declare class ConnectivityController {
    private readonly connectivityService;
    constructor(connectivityService: ConnectivityService);
    create(userId: string, dto: CreateConnectivityDto): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            channelManagerUsed: boolean;
            connectedWithTravelAgency: boolean;
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            channelManagerUsed: boolean;
            connectedWithTravelAgency: boolean;
        };
    }>;
}
