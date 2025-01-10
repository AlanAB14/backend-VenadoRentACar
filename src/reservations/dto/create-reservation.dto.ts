import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {
    @IsNumber()
    @IsNotEmpty()
    car: number;
    
    @IsDateString()
    @IsNotEmpty()
    date_start: string;
    
    @IsNotEmpty()
    @IsDateString()
    date_end: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
      
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    observation?: string;
}
