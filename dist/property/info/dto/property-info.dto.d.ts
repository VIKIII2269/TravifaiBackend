export declare class CreatePropertyInfoDto {
    hotelName: string;
    businessOwnerName: string;
    designation: string;
    contact1Phone: string;
    contact1Email: string;
    contact1Landline?: string;
    contact2Phone?: string;
    contact2Email?: string;
    contact2Landline?: string;
    locationLocality: string;
    locationStreet: string;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    locationPincode: string;
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
