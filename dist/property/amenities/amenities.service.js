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
exports.AmenitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let AmenitiesService = class AmenitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto) {
        const existing = await this.prisma.amenities.findUnique({ where: { userId } });
        const data = {
            userId,
            mandatory: dto.mandatory,
            basicFacilities: dto.basicFacilities,
            generalServices: dto.generalServices,
            outdoorActivities: dto.outdoorActivities,
            commonAreas: dto.commonAreas,
            foodAndDrink: dto.foodAndDrink,
            healthWellness: dto.healthWellness,
            businessCenter: dto.businessCenter,
            beautyAndSpa: dto.beautyAndSpa,
        };
        if (existing) {
            return this.prisma.amenities.update({
                where: { userId },
                data,
            });
        }
        return this.prisma.amenities.create({ data });
    }
    async getByUser(userId) {
        const record = await this.prisma.amenities.findUnique({ where: { userId } });
        if (!record) {
            throw new common_1.NotFoundException('Amenities not found');
        }
        return record;
    }
};
exports.AmenitiesService = AmenitiesService;
exports.AmenitiesService = AmenitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AmenitiesService);
//# sourceMappingURL=amenities.service.js.map