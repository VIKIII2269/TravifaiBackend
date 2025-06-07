"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInfoModule = void 0;
const common_1 = require("@nestjs/common");
const property_info_service_1 = require("./property-info.service");
const property_info_controller_1 = require("./property-info.controller");
const prisma_service_1 = require("../../prisma.service");
const s3_service_1 = require("../../utils/s3.service");
let PropertyInfoModule = class PropertyInfoModule {
};
exports.PropertyInfoModule = PropertyInfoModule;
exports.PropertyInfoModule = PropertyInfoModule = __decorate([
    (0, common_1.Module)({
        controllers: [property_info_controller_1.PropertyInfoController],
        providers: [property_info_service_1.PropertyInfoService, prisma_service_1.PrismaService, s3_service_1.S3Service],
    })
], PropertyInfoModule);
//# sourceMappingURL=property-info.module.js.map