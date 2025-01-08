import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicle_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTypesService {

  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}
  
  async create(createVehicleTypeDto: CreateVehicleTypeDto): Promise<VehicleType> {
    const type = await this.vehicleTypeRepository.findOneBy(createVehicleTypeDto);
    
    if (type) throw new ConflictException(`El tipo ${ type.type } ya existe`);
    
    return await this.vehicleTypeRepository.save(createVehicleTypeDto);
  }

  async findAll(): Promise<VehicleType[]>{
    return await this.vehicleTypeRepository.find();
  }

  async findOne(id: number): Promise<VehicleType> {
    const type = await this.vehicleTypeRepository.findOneBy({ id });
    if ( !type ) throw new NotFoundException(`No existe tipo con id ${ id }`);
    return type;
  }

  async update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<VehicleType> {
    const type = await this.vehicleTypeRepository.findOneBy({ id })
    if (!type) throw new NotFoundException(`No existe tipo con id ${ id }`);
    Object.assign(type, updateVehicleTypeDto);
    return await this.vehicleTypeRepository.save(type);
  }

  async remove(id: number): Promise<VehicleType> {
    const type = await this.vehicleTypeRepository.findOneBy({ id })
    if (!type) throw new NotFoundException(`No existe tipo con id ${ id }`);
    return await this.vehicleTypeRepository.remove(type);
  }
}
