import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherFeature } from './entities/other_feature.entity';
import { Repository } from 'typeorm';
import { plainToInstance, plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class OtherFeaturesService {

  constructor(
    @InjectRepository(OtherFeature)
    private readonly otherFeaturesRepository: Repository<OtherFeature>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOtherFeatureDto: CreateOtherFeatureDto, userId: number): Promise<OtherFeature> {
    const otherFeatureEntity = plainToInstance(OtherFeature, createOtherFeatureDto);
    if (userId) {
      const userUpdated = await this.userRepository.findOne({ where: { id: userId } })
      otherFeatureEntity.updated_by = userUpdated;
    } 
    return await this.otherFeaturesRepository.save(otherFeatureEntity);
  }

  async findAll(): Promise<OtherFeature[]> {
    const otherFeatures = await this.otherFeaturesRepository.find(); 
    return plainToClass(OtherFeature, otherFeatures);
  }

  async findOne(id: number): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id });
    if (!otherFeature) throw new NotFoundException(`No se encontro caracteristica con id ${ id }`);
    return plainToClass(OtherFeature, otherFeature);
  }
  
  async update(id: number, updateOtherFeatureDto: UpdateOtherFeatureDto, userId: number): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id });
    const userUpdated = await this.userRepository.findOne({ where: { id: userId } });

    if (updateOtherFeatureDto.icon && otherFeature.icon) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', 'icons', path.basename(otherFeature.icon));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    if (!otherFeature) throw new NotFoundException(`No se encontro caracteristica con id ${ id }`);
    Object.assign(otherFeature, updateOtherFeatureDto, {
      updated_by: userUpdated
    });

    return await this.otherFeaturesRepository.save(otherFeature);
  }

  async remove(id: number): Promise<OtherFeature> {
    const otherFeature = await this.otherFeaturesRepository.findOneBy({ id })
    if (!otherFeature) throw new NotFoundException(`No existe caracteristica con id ${ id }`);
    return await this.otherFeaturesRepository.remove(otherFeature);
  }
}
