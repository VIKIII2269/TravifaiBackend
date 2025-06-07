export declare class S3Service {
    private s3;
    private bucketName;
    constructor();
    uploadFile(fileBuffer: Buffer, originalName: string, folder: string): Promise<string>;
}
