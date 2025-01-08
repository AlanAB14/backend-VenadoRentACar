import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOtherFeatureDto {
    @IsString()
    @IsNotEmpty()
    icon: string;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
       
    @IsInt()
    updated_by: number;
}
