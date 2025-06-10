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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRoomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PropertyRoomsService = class PropertyRoomsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto, imageUrls) {
        return this.prisma.propertyRoom.create({
            data: {
                userId,
                roomTypeName: dto.roomTypeName,
                floorNumber: dto.floorNumber,
                totalRooms: dto.totalRooms,
                roomType: dto.roomType,
                bedType: dto.bedType,
                roomView: dto.roomView,
                smokingAllowed: dto.smokingAllowed,
                extraBedAllowed: dto.extraBedAllowed,
                amenities: dto.amenities,
                availabilityStart: new Date(dto.availabilityStart),
                availabilityEnd: new Date(dto.availabilityEnd),
                baseAdult: dto.baseAdult,
                maxAdult: dto.maxAdult,
                maxChildren: dto.maxChildren,
                maxOccupancy: dto.maxOccupancy,
                baseRate: dto.baseRate,
                extraAdultCharge: dto.extraAdultCharge,
                childCharge: dto.childCharge,
                totalRoomsInProperty: dto.totalRoomsInProperty,
                uploadRoomImageUrls: imageUrls,
            },
        });
    }
    async findAllByUser(userId) {
        const rooms = await this.prisma.propertyRoom.findMany({ where: { userId } });
        if (!rooms || rooms.length === 0) {
            throw new common_1.NotFoundException('No rooms found for this user');
        }
        return rooms;
    }
};
exports.PropertyRoomsService = PropertyRoomsService;
exports.PropertyRoomsService = PropertyRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyRoomsService);
//# sourceMappingURL=property-room.service.js.map