import { PrismaService } from '../../prisma.service';
import { UploadDocumentDto } from './dto/documents.dto';
export declare class DocumentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upload(userId: string, dto: UploadDocumentDto, fileUrl: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        category: string;
        fileUrl: string;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        category: string;
        fileUrl: string;
    }[]>;
}
