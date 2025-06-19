import { PartialType } from "@nestjs/swagger";
import { CreatePropertyInfoDto } from "./property-info.dto";

export class UpdatePropertyInfoDto extends PartialType(CreatePropertyInfoDto) {}
