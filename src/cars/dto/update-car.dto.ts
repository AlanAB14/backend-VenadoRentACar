import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @IsBoolean()
    @IsOptional()
    availability?: boolean;
    
}
