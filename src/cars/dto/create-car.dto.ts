import { Exclude } from "class-transformer";
import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;

    @Exclude()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @IsArray()
    images?: number[];
  
    @IsNotEmpty()
    @IsNumber()
    price_per_day: number;
  
    @IsOptional()
    @IsNumber()
    main_features?: number;
  
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    other_features?: number[];
  
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    vehicle_type: number[];
  
    @IsNotEmpty()
    @IsNumber()
    updated_by: number;
}
