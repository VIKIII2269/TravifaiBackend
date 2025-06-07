export declare class ContactDto {
    phone: string;
    email: string;
    landline?: string;
}
export declare class LocationDto {
    locality: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}
export declare class CreatePropertyInfoDto {
    hotelName: string;
    businessOwnerName: string;
    designation: string;
    contact1: ContactDto;
    contact2?: ContactDto;
    location: LocationDto;
    propertyType: string;
    propertyRelationship: string;
    onLease: boolean;
    totalRooms: number;
    registerOnOTAs: boolean;
    commissionPercentToOTAs?: number;
    uploadIntroVideo?: any;
}
export declare class UpdatePropertyInfoDto extends CreatePropertyInfoDto {
}
