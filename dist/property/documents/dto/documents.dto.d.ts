export declare enum DocumentCategory {
    LEGAL = "Legal Docs",
    OWNERSHIP = "Ownership/Lease",
    ID_PROOF = "ID Proof",
    FINANCIAL = "Financial Docs",
    COMPLIANCE = "Compliance",
    CERTIFICATIONS = "Certifications",
    SPECIAL_LICENSES = "Special Licenses"
}
export declare class UploadDocumentDto {
    category: DocumentCategory;
    file: any;
}
