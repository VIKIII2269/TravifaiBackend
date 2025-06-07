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
exports.ConnectivityController = void 0;
const common_1 = require("@nestjs/common");
const connectivity_service_1 = require("./connectivity.service");
const connectivity_dto_1 = require("./dto/connectivity.dto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let ConnectivityController = class ConnectivityController {
    constructor(connectivityService) {
        this.connectivityService = connectivityService;
    }
    async create(userId, dto) {
        const result = await this.connectivityService.createOrUpdate(userId, dto);
        return { data: result };
    }
    async getByUser(userId) {
        const result = await this.connectivityService.getByUser(userId);
        return { data: result };
    }
};
exports.ConnectivityController = ConnectivityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update connectivity info' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Connectivity info created/updated.' }),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, connectivity_dto_1.CreateConnectivityDto]),
    __metadata("design:returntype", Promise)
], ConnectivityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get connectivity info by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Connectivity info fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectivityController.prototype, "getByUser", null);
exports.ConnectivityController = ConnectivityController = __decorate([
    (0, swagger_1.ApiTags)('Connectivity Partners'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/connectivity'),
    __metadata("design:paramtypes", [connectivity_service_1.ConnectivityService])
], ConnectivityController);
//# sourceMappingURL=connectivity.controller.js.map