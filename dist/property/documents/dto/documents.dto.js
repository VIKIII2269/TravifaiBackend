"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDocumentDto = exports.DocumentCategory = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DocumentCategory;
(function (DocumentCategory) {
    DocumentCategory["LEGAL"] = "Legal Docs";
    DocumentCategory["OWNERSHIP"] = "Ownership/Lease";
    DocumentCategory["ID_PROOF"] = "ID Proof";
    DocumentCategory["FINANCIAL"] = "Financial Docs";
    DocumentCategory["COMPLIANCE"] = "Compliance";
    DocumentCategory["CERTIFICATIONS"] = "Certifications";
    DocumentCategory["SPECIAL_LICENSES"] = "Special Licenses";
})(DocumentCategory || (exports.DocumentCategory = DocumentCategory = {}));
class UploadDocumentDto {
}
exports.UploadDocumentDto = UploadDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: DocumentCategory,
        enumName: 'DocumentCategory',
        description: 'Category of the document',
    }),
    (0, class_validator_1.IsEnum)(DocumentCategory),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], UploadDocumentDto.prototype, "file", void 0);
//# sourceMappingURL=documents.dto.js.map