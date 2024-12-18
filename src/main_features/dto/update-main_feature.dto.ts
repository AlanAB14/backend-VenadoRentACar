import { PartialType } from '@nestjs/mapped-types';
import { CreateMainFeatureDto } from './create-main_feature.dto';

export class UpdateMainFeatureDto extends PartialType(CreateMainFeatureDto) {}
