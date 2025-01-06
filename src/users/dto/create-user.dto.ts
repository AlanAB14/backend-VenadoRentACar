import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    password: string;


    @IsNumber()
    @IsNotEmpty()
    role_id: number;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;
    
    @IsString()
    @IsOptional()
    avatar?: string;
}
