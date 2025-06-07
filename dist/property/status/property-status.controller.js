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
exports.PropertyStatusController = void 0;
const common_1 = require("@nestjs/common");
const property_status_service_1 = require("./property-status.service");
const swagger_1 = require("@nestjs/swagger");
let PropertyStatusController = class PropertyStatusController {
    constructor(propertyStatusService) {
        this.propertyStatusService = propertyStatusService;
    }
    async getStatus(userId) {
        const statusRecord = await this.propertyStatusService.getStatus(userId);
        return { status: statusRecord.status };
    }
};
exports.PropertyStatusController = PropertyStatusController;
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get property submission status for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Property status fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyStatusController.prototype, "getStatus", null);
exports.PropertyStatusController = PropertyStatusController = __decorate([
    (0, swagger_1.ApiTags)('Property Status'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/status'),
    __metadata("design:paramtypes", [property_status_service_1.PropertyStatusService])
], PropertyStatusController);
//# sourceMappingURL=property-status.controller.js.map