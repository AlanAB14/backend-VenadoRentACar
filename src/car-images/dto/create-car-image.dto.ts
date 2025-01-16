import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarImageDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrl?: string[];

  @IsInt()
  updated_by: number;
}
