import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserNotificationDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    user: string;
}
