export declare class CreatePropertyUspDto {
    ageOfProperty: number;
    historicalEvent: boolean;
    description?: string;
    propertyOwnerDescription: string;
    nearbyPlaces: string[];
}
export declare class UpdatePropertyUspDto extends CreatePropertyUspDto {
}
