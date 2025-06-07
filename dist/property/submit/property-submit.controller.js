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
exports.PropertySubmitController = void 0;
const common_1 = require("@nestjs/common");
const property_submit_service_1 = require("./property-submit.service");
const swagger_1 = require("@nestjs/swagger");
let PropertySubmitController = class PropertySubmitController {
    constructor(propertySubmitService) {
        this.propertySubmitService = propertySubmitService;
    }
    async submit(userId) {
        const result = await this.propertySubmitService.submit(userId);
        return { data: result };
    }
    async approve(userId) {
        const result = await this.propertySubmitService.simulateApproval(userId);
        return { data: result };
    }
};
exports.PropertySubmitController = PropertySubmitController;
__decorate([
    (0, common_1.Post)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit property for approval' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Property submitted.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertySubmitController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('approve/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Simulate approval after 48 hours' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Property approved.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertySubmitController.prototype, "approve", null);
exports.PropertySubmitController = PropertySubmitController = __decorate([
    (0, swagger_1.ApiTags)('Property Submission'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/submit'),
    __metadata("design:paramtypes", [property_submit_service_1.PropertySubmitService])
], PropertySubmitController);
//# sourceMappingURL=property-submit.controller.js.map