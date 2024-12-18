import { Injectable } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';

@Injectable()
export class VehicleTypesService {
  create(createVehicleTypeDto: CreateVehicleTypeDto) {
    return 'This action adds a new vehicleType';
  }

  findAll() {
    return `This action returns all vehicleTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleType`;
  }

  update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return `This action updates a #${id} vehicleType`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleType`;
  }
}
