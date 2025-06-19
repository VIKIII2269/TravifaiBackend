import { PartialType } from "@nestjs/swagger";
import { CreatePropertyRulesDto } from "./property-rules.dto";

export class UpdatePropertyRulesDto extends PartialType(CreatePropertyRulesDto) {}
