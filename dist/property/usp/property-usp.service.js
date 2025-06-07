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
exports.PropertyUspService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PropertyUspService = class PropertyUspService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto) {
        const existing = await this.prisma.propertyUSP.findUnique({ where: { userId } });
        const data = {
            userId,
            ageOfProperty: dto.ageOfProperty,
            historicalEventAvailable: dto.historicalEvent,
            historicalEventDesc: dto.historicalEvent ? dto.description : null,
            propertyOwnerDescription: dto.propertyOwnerDescription,
            nearbyPlaces: dto.nearbyPlaces,
        };
        if (existing) {
            return this.prisma.propertyUSP.update({
                where: { userId },
                data,
            });
        }
        return this.prisma.propertyUSP.create({ data });
    }
    async getByUser(userId) {
        const record = await this.prisma.propertyUSP.findUnique({ where: { userId } });
        if (!record) {
            throw new common_1.NotFoundException('Property USP not found');
        }
        return record;
    }
};
exports.PropertyUspService = PropertyUspService;
exports.PropertyUspService = PropertyUspService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyUspService);
//# sourceMappingURL=property-usp.service.js.map