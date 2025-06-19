import { PartialType } from "@nestjs/swagger";
import { CreatePropertyRoomDto } from "./property-room.dto";

export class UpdatePropertyRoomDto extends PartialType(CreatePropertyRoomDto) {}
