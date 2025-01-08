import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { GearboxType } from "src/common/enums/gearbox.enum";

export class CreateMainFeatureDto {
    @IsInt()
    @IsNotEmpty()
    persons: number;
    
    @IsInt()
    @IsNotEmpty()
    doors: number;
    
    @IsInt()
    @IsNotEmpty()
    luggage: number;
    
    @IsBoolean()
    @IsNotEmpty()
    air_conditioning: boolean;
    
    @IsNotEmpty()
    @IsEnum(GearboxType, {
        message: 'Type must be one of the following values: ' + Object.values(GearboxType).join(', '),
    })
    gearbox: GearboxType;

    @IsInt()
    updated_by: number;
}
