import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOtherFeatureDto {
    @IsString()
    @IsOptional()
    icon?: string;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
       
    @IsInt()
    updated_by: number;
}
