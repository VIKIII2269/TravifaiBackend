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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const property_info_service_1 = require("./property-info.service");
const property_info_dto_1 = require("./dto/property-info.dto");
const s3_service_1 = require("../../utils/s3.service");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let PropertyInfoController = class PropertyInfoController {
    constructor(propertyInfoService, s3Service) {
        this.propertyInfoService = propertyInfoService;
        this.s3Service = s3Service;
    }
    async create(userId, createDto, file) {
        let videoUrl;
        if (file) {
            videoUrl = await this.s3Service.uploadFile(file.buffer, file.originalname, 'intro-videos');
        }
        const result = await this.propertyInfoService.createOrUpdate(userId, createDto, videoUrl);
        return { data: result };
    }
    async getByUser(userId) {
        const result = await this.propertyInfoService.getByUser(userId);
        return { data: result };
    }
};
exports.PropertyInfoController = PropertyInfoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update property information' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('uploadIntroVideo')),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Property info created/updated.' }),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, property_info_dto_1.CreatePropertyInfoDto, Object]),
    __metadata("design:returntype", Promise)
], PropertyInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get property information by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Property info fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyInfoController.prototype, "getByUser", null);
exports.PropertyInfoController = PropertyInfoController = __decorate([
    (0, swagger_1.ApiTags)('Property Information'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/info'),
    __metadata("design:paramtypes", [property_info_service_1.PropertyInfoService,
        s3_service_1.S3Service])
], PropertyInfoController);
//# sourceMappingURL=property-info.controller.js.map