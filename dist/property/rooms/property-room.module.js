"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRoomsModule = void 0;
const common_1 = require("@nestjs/common");
const property_room_service_1 = require("./property-room.service");
const property_room_controller_1 = require("./property-room.controller");
const prisma_service_1 = require("../../prisma.service");
const s3_service_1 = require("../../utils/s3.service");
let PropertyRoomsModule = class PropertyRoomsModule {
};
exports.PropertyRoomsModule = PropertyRoomsModule;
exports.PropertyRoomsModule = PropertyRoomsModule = __decorate([
    (0, common_1.Module)({
        controllers: [property_room_controller_1.PropertyRoomsController],
        providers: [property_room_service_1.PropertyRoomsService, prisma_service_1.PrismaService, s3_service_1.S3Service],
    })
], PropertyRoomsModule);
//# sourceMappingURL=property-room.module.js.map