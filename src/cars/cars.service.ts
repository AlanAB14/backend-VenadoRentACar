import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { VehicleType } from 'src/vehicle_types/entities/vehicle_type.entity';
import { OtherFeature } from 'src/other_features/entities/other_feature.entity';

@Injectable()
export class CarsService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
    @InjectRepository(OtherFeature)
    private readonly otherFeaturesRepository: Repository<OtherFeature>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const carEntity = plainToInstance(Car, createCarDto);
    if (createCarDto.vehicle_type && createCarDto.vehicle_type.length > 0) {
      const vehicleTypes = await this.vehicleTypeRepository.findByIds(createCarDto.vehicle_type);
      carEntity.vehicle_type = vehicleTypes;
    }
    if (createCarDto.other_features && createCarDto.other_features.length > 0) {
      const otherFeatures = await this.otherFeaturesRepository.findByIds(createCarDto.other_features);
      carEntity.other_features = otherFeatures;
    }

    return await this.carRepository.save(carEntity);
  }

  async findAll(): Promise<Car[]>{
    return await this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if ( !car ) throw new NotFoundException(`No se encontró auto con id ${ id }`);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if ( !car ) throw new NotFoundException(`No se encontró auto con id ${ id }`);
    
    Object.assign(car, updateCarDto);

    if (updateCarDto.vehicle_type && updateCarDto.vehicle_type.length > 0) {
      const vehicleTypes = await this.vehicleTypeRepository.findByIds(updateCarDto.vehicle_type);
      car.vehicle_type = vehicleTypes;
    }
    
    if (updateCarDto.other_features && updateCarDto.other_features.length > 0) {
      const otherFeatures = await this.otherFeaturesRepository.findByIds(updateCarDto.other_features);
      car.other_features = otherFeatures;
    }

    return await this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new NotFoundException(`No existe auto con id: ${ id }`);
    return await this.carRepository.softDelete(id);
  }
}
