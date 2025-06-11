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
exports.PropertyRulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PropertyRulesService = class PropertyRulesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto) {
        const existing = await this.prisma.propertyRules.findUnique({ where: { userId } });
        const data = {
            userId,
            coupleRule: dto.coupleRule,
            guestRule: dto.guestRule,
            otherRule: dto.otherRule,
            petRule: dto.petRule,
            checkInTime: dto.checkInTime,
            checkOutTime: dto.checkOutTime,
        };
        if (existing) {
            return this.prisma.propertyRules.update({
                where: { userId },
                data,
            });
        }
        return this.prisma.propertyRules.create({ data });
    }
    async getByUser(userId) {
        const record = await this.prisma.propertyRules.findUnique({ where: { userId } });
        if (!record) {
            throw new common_1.NotFoundException('Property rules not found');
        }
        return record;
    }
};
exports.PropertyRulesService = PropertyRulesService;
exports.PropertyRulesService = PropertyRulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyRulesService);
//# sourceMappingURL=property-rules.service.js.map