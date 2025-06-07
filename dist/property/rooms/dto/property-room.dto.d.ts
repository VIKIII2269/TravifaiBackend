export declare class AvailabilityDto {
    startDate: string;
    endDate: string;
}
export declare class CreatePropertyRoomDto {
    roomTypeName: string;
    floorNumber: number;
    totalRooms: number;
    roomType: string;
    bedType: string;
    roomView: string;
    smokingAllowed: boolean;
    extraBedAllowed: boolean;
    amenities: string[];
    availability: AvailabilityDto;
    baseAdult: number;
    maxAdult: number;
    maxChildren: number;
    maxOccupancy: number;
    baseRate: number;
    extraAdultCharge: number;
    childCharge: number;
    totalRoomsInProperty: number;
    uploadRoomImages: any[];
}
