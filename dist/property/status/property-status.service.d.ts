import { PrismaService } from '../../prisma.service';
export declare class PropertyStatusService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatus(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
}
