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
exports.PropertyRulesController = void 0;
const common_1 = require("@nestjs/common");
const property_rules_service_1 = require("./property-rules.service");
const property_rules_dto_1 = require("./dto/property-rules.dto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let PropertyRulesController = class PropertyRulesController {
    constructor(propertyRulesService) {
        this.propertyRulesService = propertyRulesService;
    }
    async create(userId, dto) {
        const result = await this.propertyRulesService.createOrUpdate(userId, dto);
        return { data: result };
    }
    async getByUser(userId) {
        const result = await this.propertyRulesService.getByUser(userId);
        return { data: result };
    }
};
exports.PropertyRulesController = PropertyRulesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update property rules' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Property rules created/updated.' }),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, property_rules_dto_1.CreatePropertyRulesDto]),
    __metadata("design:returntype", Promise)
], PropertyRulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get property rules by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Property rules fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyRulesController.prototype, "getByUser", null);
exports.PropertyRulesController = PropertyRulesController = __decorate([
    (0, swagger_1.ApiTags)('Property Rules'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/rules'),
    __metadata("design:paramtypes", [property_rules_service_1.PropertyRulesService])
], PropertyRulesController);
//# sourceMappingURL=property-rules.controller.js.map