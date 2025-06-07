"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandatoryAmenitiesModule = void 0;
const common_1 = require("@nestjs/common");
const mandatory_amenities_service_1 = require("./mandatory-amenities.service");
const mandatory_amenities_controller_1 = require("./mandatory-amenities.controller");
const prisma_service_1 = require("../../prisma.service");
let MandatoryAmenitiesModule = class MandatoryAmenitiesModule {
};
exports.MandatoryAmenitiesModule = MandatoryAmenitiesModule;
exports.MandatoryAmenitiesModule = MandatoryAmenitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [mandatory_amenities_controller_1.MandatoryAmenitiesController],
        providers: [mandatory_amenities_service_1.MandatoryAmenitiesService, prisma_service_1.PrismaService],
    })
], MandatoryAmenitiesModule);
//# sourceMappingURL=mandatory-amenities.module.js.map