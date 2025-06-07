import { CreateConnectivityDto } from './dto/connectivity.dto';
import { PrismaService } from '../../prisma.service';
export declare class ConnectivityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreateConnectivityDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        channelManagerUsed: boolean;
        connectedWithTravelAgency: boolean;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        channelManagerUsed: boolean;
        connectedWithTravelAgency: boolean;
    }>;
}
