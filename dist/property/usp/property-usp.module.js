"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyUspModule = void 0;
const common_1 = require("@nestjs/common");
const property_usp_service_1 = require("./property-usp.service");
const property_usp_controller_1 = require("./property-usp.controller");
const prisma_service_1 = require("../../prisma.service");
let PropertyUspModule = class PropertyUspModule {
};
exports.PropertyUspModule = PropertyUspModule;
exports.PropertyUspModule = PropertyUspModule = __decorate([
    (0, common_1.Module)({
        controllers: [property_usp_controller_1.PropertyUspController],
        providers: [property_usp_service_1.PropertyUspService, prisma_service_1.PrismaService],
    })
], PropertyUspModule);
//# sourceMappingURL=property-usp.module.js.map