import { Injectable } from '@nestjs/common';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';

@Injectable()
export class MainFeaturesService {
  create(createMainFeatureDto: CreateMainFeatureDto) {
    return 'This action adds a new mainFeature';
  }

  findAll() {
    return `This action returns all mainFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mainFeature`;
  }

  update(id: number, updateMainFeatureDto: UpdateMainFeatureDto) {
    return `This action updates a #${id} mainFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainFeature`;
  }
}
