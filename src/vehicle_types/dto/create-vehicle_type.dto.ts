import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleTypeDto {
    @IsNotEmpty()
    @IsString()
    type: string;
}
