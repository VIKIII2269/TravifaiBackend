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
exports.MandatoryAmenitiesController = void 0;
const common_1 = require("@nestjs/common");
const mandatory_amenities_service_1 = require("./mandatory-amenities.service");
const mandatory_amenities_dto_1 = require("./dto/mandatory-amenities.dto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let MandatoryAmenitiesController = class MandatoryAmenitiesController {
    constructor(mandatoryAmenitiesService) {
        this.mandatoryAmenitiesService = mandatoryAmenitiesService;
    }
    async create(userId, dto) {
        const result = await this.mandatoryAmenitiesService.createOrUpdate(userId, dto);
        return { data: result };
    }
    async getByUser(userId) {
        const result = await this.mandatoryAmenitiesService.getByUser(userId);
        return { data: result };
    }
};
exports.MandatoryAmenitiesController = MandatoryAmenitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update mandatory amenities' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Mandatory amenities created/updated.' }),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mandatory_amenities_dto_1.CreateMandatoryAmenitiesDto]),
    __metadata("design:returntype", Promise)
], MandatoryAmenitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mandatory amenities by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mandatory amenities fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MandatoryAmenitiesController.prototype, "getByUser", null);
exports.MandatoryAmenitiesController = MandatoryAmenitiesController = __decorate([
    (0, swagger_1.ApiTags)('Mandatory Amenities Toggles'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/amenities/mandatory'),
    __metadata("design:paramtypes", [mandatory_amenities_service_1.MandatoryAmenitiesService])
], MandatoryAmenitiesController);
//# sourceMappingURL=mandatory-amenities.controller.js.map