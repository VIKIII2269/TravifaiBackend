import { PartialType } from "@nestjs/swagger";
import { CreateMandatoryAmenitiesDto } from "./mandatory-amenities.dto";

export class UpdateMandatoryAmenitiesDto extends PartialType(CreateMandatoryAmenitiesDto) {}
