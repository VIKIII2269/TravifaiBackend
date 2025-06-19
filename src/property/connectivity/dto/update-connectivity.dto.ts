import { PartialType } from "@nestjs/swagger";
import { CreateConnectivityDto } from "./connectivity.dto";

export class UpdateConnectivityDto extends PartialType(CreateConnectivityDto) {}