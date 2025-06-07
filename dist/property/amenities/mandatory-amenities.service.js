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
exports.MandatoryAmenitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let MandatoryAmenitiesService = class MandatoryAmenitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto) {
        const existing = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
        const data = {
            userId,
            airConditioning: dto.airConditioning,
            laundry: dto.laundry,
            newspaper: dto.newspaper,
            parking: dto.parking,
            roomService: dto.roomService,
            smokeDetector: dto.smokeDetector,
            smokingRooms: dto.smokingRooms,
            swimmingPools: dto.swimmingPools,
            wifi: dto.wifi,
            lounge: dto.lounge,
            reception: dto.reception,
            bar: dto.bar,
        };
        if (existing) {
            return this.prisma.mandatoryAmenities.update({
                where: { userId },
                data,
            });
        }
        return this.prisma.mandatoryAmenities.create({ data });
    }
    async getByUser(userId) {
        const record = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
        if (!record) {
            throw new common_1.NotFoundException('Mandatory amenities not found');
        }
        return record;
    }
};
exports.MandatoryAmenitiesService = MandatoryAmenitiesService;
exports.MandatoryAmenitiesService = MandatoryAmenitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MandatoryAmenitiesService);
//# sourceMappingURL=mandatory-amenities.service.js.map