import { PrismaService } from '../../prisma.service';
export declare class PropertyStatusService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatus(userId: string): Promise<{
        id: string;
        status: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
