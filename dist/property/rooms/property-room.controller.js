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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRoomsController = void 0;
const common_1 = require("@nestjs/common");
const property_room_service_1 = require("./property-room.service");
const property_room_dto_1 = require("./dto/property-room.dto");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../../utils/s3.service");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const class_transformer_1 = require("class-transformer");
let PropertyRoomsController = class PropertyRoomsController {
    constructor(propertyRoomsService, s3Service) {
        this.propertyRoomsService = propertyRoomsService;
        this.s3Service = s3Service;
    }
    async create(userId, body, files) {
        if (body.amenities && typeof body.amenities === 'string') {
            body.amenities = [body.amenities];
        }
        const numericFields = [
            'floorNumber',
            'totalRooms',
            'baseAdult',
            'maxAdult',
            'maxChildren',
            'maxOccupancy',
            'baseRate',
            'extraAdultCharge',
            'childCharge',
            'totalRoomsInProperty',
        ];
        for (const field of numericFields) {
            if (body[field]) {
                body[field] = Number(body[field]);
            }
        }
        body.smokingAllowed = body.smokingAllowed === 'true' || body.smokingAllowed === true;
        body.extraBedAllowed = body.extraBedAllowed === 'true' || body.extraBedAllowed === true;
        const createDto = (0, class_transformer_1.plainToInstance)(property_room_dto_1.CreatePropertyRoomDto, body);
        let imageUrls = [];
        if (files?.uploadRoomImages?.length) {
            const uploads = await Promise.all(files.uploadRoomImages.map((file) => this.s3Service.uploadFile(file.buffer, file.originalname, 'room-images')));
            imageUrls = uploads;
        }
        const result = await this.propertyRoomsService.create(userId, createDto, imageUrls);
        return { data: result };
    }
    async findAll(userId) {
        const rooms = await this.propertyRoomsService.findAllByUser(userId);
        return { data: rooms };
    }
};
exports.PropertyRoomsController = PropertyRoomsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a room type for the property' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                roomTypeName: { type: 'string' },
                floorNumber: { type: 'number' },
                totalRooms: { type: 'number' },
                roomType: { type: 'string' },
                bedType: { type: 'string' },
                roomView: { type: 'string' },
                smokingAllowed: { type: 'boolean' },
                extraBedAllowed: { type: 'boolean' },
                amenities: { type: 'array', items: { type: 'string' } },
                availabilityStart: { type: 'string', format: 'date-time' },
                availabilityEnd: { type: 'string', format: 'date-time' },
                baseAdult: { type: 'number' },
                maxAdult: { type: 'number' },
                maxChildren: { type: 'number' },
                maxOccupancy: { type: 'number' },
                baseRate: { type: 'number' },
                extraAdultCharge: { type: 'number' },
                childCharge: { type: 'number' },
                totalRoomsInProperty: { type: 'number' },
                uploadRoomImages: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'uploadRoomImages', maxCount: 5 }])),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Room created.' }),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PropertyRoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all room types for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rooms fetched.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyRoomsController.prototype, "findAll", null);
exports.PropertyRoomsController = PropertyRoomsController = __decorate([
    (0, swagger_1.ApiTags)('Property Rooms'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/property/rooms'),
    __metadata("design:paramtypes", [property_room_service_1.PropertyRoomsService,
        s3_service_1.S3Service])
], PropertyRoomsController);
//# sourceMappingURL=property-room.controller.js.map