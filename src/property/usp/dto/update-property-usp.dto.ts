import { PartialType } from "@nestjs/swagger";
import { CreatePropertyUspDto } from "./property-usp.dto";

export class UpdatePropertyUspDto extends PartialType(CreatePropertyUspDto) {}
