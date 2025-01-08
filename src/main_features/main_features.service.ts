import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MainFeature } from './entities/main_feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainFeaturesService {

  constructor(
    @InjectRepository(MainFeature)
    private readonly mainFeaturesRepository: Repository<MainFeature>,
  ) {}

  async create(createMainFeatureDto: CreateMainFeatureDto): Promise<MainFeature> {
    return await this.mainFeaturesRepository.save(createMainFeatureDto);
  }

  async findOne(id: number): Promise<MainFeature> {
    const mainFeatures = await this.mainFeaturesRepository.findOneBy({ id });
    if (!mainFeatures) throw new NotFoundException(`No se encontraron caracteristicas para el id ${ id }`);
    return mainFeatures;
  }

  async update(id: number, updateMainFeatureDto: UpdateMainFeatureDto): Promise<MainFeature> {
    const mainFeatures = await this.mainFeaturesRepository.findOneBy({ id })
    if (!mainFeatures) throw new NotFoundException(`No existen caracteristicas con id ${ id }`);
    Object.assign(mainFeatures, updateMainFeatureDto, {
      updated_at: new Date(),
    });

    return await this.mainFeaturesRepository.save(mainFeatures);
  }

  async remove(id: number) : Promise<MainFeature>{
    const mainFeature = await this.mainFeaturesRepository.findOneBy({ id })
    if (!mainFeature) throw new NotFoundException(`No existe caracteristica con id ${ id }`);
    return await this.mainFeaturesRepository.remove(mainFeature);
  }
}
