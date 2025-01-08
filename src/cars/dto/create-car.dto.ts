import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    image: string;
  
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '0,2' })
    price_per_day: number;
  
    @IsOptional()
    @IsNumber()
    main_features_id?: number;
  
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    other_features_id?: number[];
  
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    vehicle_type: number[];
  
    @IsNotEmpty()
    @IsNumber()
    updated_by: number;
}
