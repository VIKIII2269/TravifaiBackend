import { PartialType } from "@nestjs/swagger";
import { CreateAmenitiesDto } from "./amenities.dto";

export class UpdateAmenitiesDto extends PartialType(CreateAmenitiesDto) {}