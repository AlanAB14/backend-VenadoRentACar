import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty() @IsString() name: string;

  @IsOptional() @IsString() description?: string;

  @Transform(({ value }) => value === 'true' || value === true || value === 1 || value === '1')
  @IsBoolean()
  availability: boolean;

  @IsOptional() @IsArray() @IsString({ each: true }) images?: string[];

  @Transform(({ value }) => value === '' || value == null ? undefined : value)
  @Type(() => Number)
  @IsNumber()
  price_per_day: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value == null ? undefined : value)
  @Type(() => Number)
  @IsInt()
  main_features?: number;

  @IsOptional()
  @Transform(({ value }) => value == null || value === '' ? [] : (Array.isArray(value) ? value : [value]))
  @Type(() => Number)
  @IsInt({ each: true })
  @IsArray()
  other_features?: number[];

  @IsNotEmpty()
  @Transform(({ value }) => value == null || value === '' ? [] : (Array.isArray(value) ? value : [value]))
  @Type(() => Number)
  @IsInt({ each: true })
  @IsArray()
  vehicle_type: number[];

  @Transform(({ value }) => value === '' || value == null ? undefined : value)
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}
