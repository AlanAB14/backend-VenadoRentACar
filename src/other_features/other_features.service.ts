import { Injectable } from '@nestjs/common';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';

@Injectable()
export class OtherFeaturesService {
  create(createOtherFeatureDto: CreateOtherFeatureDto) {
    return 'This action adds a new otherFeature';
  }

  findAll() {
    return `This action returns all otherFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otherFeature`;
  }

  update(id: number, updateOtherFeatureDto: UpdateOtherFeatureDto) {
    return `This action updates a #${id} otherFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherFeature`;
  }
}
