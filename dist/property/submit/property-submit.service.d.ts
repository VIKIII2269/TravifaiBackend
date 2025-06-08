import { PrismaService } from '../../prisma.service';
export declare class PropertySubmitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    submit(userId: string): Promise<{
        id: string;
        status: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    simulateApproval(userId: string): Promise<{
        id: string;
        status: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
