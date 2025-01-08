import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherFeature } from './entities/other_feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtherFeaturesService {

  constructor(
    @InjectRepository(OtherFeature)
    private readonly otherFeaturesRepository: Repository<OtherFeature>,
  ) {}

  async create(createOtherFeatureDto: CreateOtherFeatureDto): Promise<OtherFeature> {
    return await this.otherFeaturesRepository.save(createOtherFeatureDto);
  }

  async findAll(): Promise<OtherFeature[]> {
    return await this.otherFeaturesRepository.find();
  }

  async findOne(id: number): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id });
    if (!otherFeature) throw new NotFoundException(`No se encontro caracteristica con id ${ id }`);
    return otherFeature;
  }
  
  async update(id: number, updateOtherFeatureDto: UpdateOtherFeatureDto): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id });
    if (!otherFeature) throw new NotFoundException(`No se encontro caracteristica con id ${ id }`);
    Object.assign(otherFeature, updateOtherFeatureDto);

    return await this.otherFeaturesRepository.save(otherFeature);
  }

  async remove(id: number): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id })
    if (!otherFeature) throw new NotFoundException(`No existe caracteristica con id ${ id }`);
    return await this.otherFeaturesRepository.remove(otherFeature);
  }
}
