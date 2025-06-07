import { PrismaService } from '../../prisma.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';
export declare class PropertyRulesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: string, dto: CreatePropertyRulesDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        coupleRule: string;
        guestRule: string;
        identityRule: string;
        petRule: string;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        coupleRule: string;
        guestRule: string;
        identityRule: string;
        petRule: string;
    }>;
}
