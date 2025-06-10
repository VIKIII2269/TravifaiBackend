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
exports.PropertyInfoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PropertyInfoService = class PropertyInfoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto, introVideoUrl) {
        const existing = await this.prisma.propertyInfo.findUnique({ where: { userId } });
        const data = {
            userId,
            hotelName: dto.hotelName,
            businessOwnerName: dto.businessOwnerName,
            designation: dto.designation,
            contact1Phone: dto.contact1Phone,
            contact1Email: dto.contact1Email,
            contact1Landline: dto.contact1Landline,
            contact2Phone: dto.contact2Phone,
            contact2Email: dto.contact2Email,
            contact2Landline: dto.contact2Landline,
            locationLocality: dto.locationLocality,
            locationStreet: dto.locationStreet,
            locationCity: dto.locationCity,
            locationState: dto.locationState,
            locationCountry: dto.locationCountry,
            locationPincode: dto.locationPincode,
            propertyType: dto.propertyType,
            propertyRelationship: dto.propertyRelationship,
            onLease: dto.onLease,
            totalRooms: dto.totalRooms,
            registerOnOTAs: dto.registerOnOTAs,
            commissionPercentToOTAs: dto.commissionPercentToOTAs,
            uploadIntroVideoUrl: introVideoUrl,
        };
        if (existing) {
            return this.prisma.propertyInfo.update({
                where: { userId },
                data,
            });
        }
        return this.prisma.propertyInfo.create({
            data,
        });
    }
    async getByUser(userId) {
        const record = await this.prisma.propertyInfo.findUnique({ where: { userId } });
        if (!record) {
            throw new common_1.NotFoundException('Property info not found');
        }
        return record;
    }
};
exports.PropertyInfoService = PropertyInfoService;
exports.PropertyInfoService = PropertyInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyInfoService);
//# sourceMappingURL=property-info.service.js.map