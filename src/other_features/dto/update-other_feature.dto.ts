import { PartialType } from '@nestjs/mapped-types';
import { CreateOtherFeatureDto } from './create-other_feature.dto';

export class UpdateOtherFeatureDto extends PartialType(CreateOtherFeatureDto) {}
