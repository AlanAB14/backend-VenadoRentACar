import { IsNotEmpty, IsString } from "class-validator";

export class singInDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}