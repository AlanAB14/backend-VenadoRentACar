import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MainFeature } from './entities/main_feature.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class MainFeaturesService {

  constructor(
    @InjectRepository(MainFeature)
    private readonly mainFeaturesRepository: Repository<MainFeature>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMainFeatureDto: CreateMainFeatureDto, userId: number): Promise<MainFeature> {
    const mainFeatureEntity = plainToInstance(MainFeature, createMainFeatureDto);
    if (userId) {
      const userUpdated = await this.userRepository.findOne({ where: { id: userId } })
      mainFeatureEntity.updated_by = userUpdated;
    } 
    return await this.mainFeaturesRepository.save(mainFeatureEntity);
  }

  async findOne(id: number): Promise<MainFeature> {
    const mainFeatures = await this.mainFeaturesRepository.findOneBy({ id });
    if (!mainFeatures) throw new NotFoundException(`No se encontraron caracteristicas para el id ${ id }`);
    return plainToClass(MainFeature, mainFeatures);
  }

  async update(id: number, updateMainFeatureDto: UpdateMainFeatureDto, userId: number): Promise<MainFeature> {
    const mainFeatures = await this.mainFeaturesRepository.findOneBy({ id })
    if (!mainFeatures) throw new NotFoundException(`No existen caracteristicas con id ${ id }`);
    const userUpdated = await this.userRepository.findOne({ where: { id: userId } })
    Object.assign(mainFeatures, updateMainFeatureDto, {
      updated_at: new Date(),
      updated_by: userUpdated
    });

    return await this.mainFeaturesRepository.save(mainFeatures);
  }

  async remove(id: number) : Promise<MainFeature>{
    const mainFeature = await this.mainFeaturesRepository.findOneBy({ id })
    if (!mainFeature) throw new NotFoundException(`No existe caracteristica con id ${ id }`);
    return await this.mainFeaturesRepository.remove(mainFeature);
  }
}
