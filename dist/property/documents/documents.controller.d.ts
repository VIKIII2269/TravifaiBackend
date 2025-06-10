import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/documents.dto';
import { S3Service } from '../../utils/s3.service';
export declare class DocumentsController {
    private readonly documentsService;
    private readonly s3Service;
    constructor(documentsService: DocumentsService, s3Service: S3Service);
    upload(userId: string, dto: UploadDocumentDto, file: Express.Multer.File): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            category: string;
            fileUrl: string;
        };
    }>;
    getByUser(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            createdAt: Date;
            category: string;
            fileUrl: string;
        }[];
    }>;
}
