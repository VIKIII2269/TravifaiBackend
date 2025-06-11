import { PrismaService } from '../../prisma.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';
export declare class PropertyRulesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreatePropertyRulesDto): Promise<{
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
    }>;
    getByUser(userId: string): Promise<{
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
    }>;
}
