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
exports.PropertySubmitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PropertySubmitService = class PropertySubmitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submit(userId) {
        const existing = await this.prisma.propertyStatus.findUnique({ where: { userId } });
        const info = await this.prisma.propertyInfo.findUnique({ where: { userId } });
        const rooms = await this.prisma.propertyRoom.findMany({ where: { userId } });
        const connectivity = await this.prisma.connectivity.findUnique({ where: { userId } });
        const usp = await this.prisma.propertyUSP.findUnique({ where: { userId } });
        const amenities = await this.prisma.amenities.findUnique({ where: { userId } });
        const mandatoryAmenities = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
        const documents = await this.prisma.document.findMany({ where: { userId } });
        const rules = await this.prisma.propertyRules.findUnique({ where: { userId } });
        if (!info || rooms.length === 0 || !connectivity || !usp || !amenities || !mandatoryAmenities || documents.length === 0 || !rules) {
            throw new common_1.BadRequestException('All sections must be completed before submission');
        }
        const now = new Date();
        if (existing) {
            if (existing.status !== 'draft') {
                throw new common_1.BadRequestException(`Cannot submit. Current status is "${existing.status}"`);
            }
            return this.prisma.propertyStatus.update({
                where: { userId },
                data: { status: 'submitted', updatedAt: now },
            });
        }
        return this.prisma.propertyStatus.create({
            data: {
                userId,
                status: 'submitted',
            },
        });
    }
    async simulateApproval(userId) {
        const statusRecord = await this.prisma.propertyStatus.findUnique({ where: { userId } });
        if (!statusRecord) {
            throw new common_1.NotFoundException('Property not found. Cannot approve.');
        }
        const submittedAt = statusRecord.updatedAt;
        const now = new Date();
        const diffMs = now.getTime() - submittedAt.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        if (statusRecord.status !== 'submitted') {
            throw new common_1.BadRequestException(`Cannot approve. Current status is "${statusRecord.status}"`);
        }
        if (diffHours < 48) {
            throw new common_1.BadRequestException('Approval can only be simulated after 48 hours of submission.');
        }
        return this.prisma.propertyStatus.update({
            where: { userId },
            data: { status: 'approved', updatedAt: now },
        });
    }
};
exports.PropertySubmitService = PropertySubmitService;
exports.PropertySubmitService = PropertySubmitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertySubmitService);
//# sourceMappingURL=property-submit.service.js.map