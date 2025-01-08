import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTypesService } from './vehicle_types.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';
import { VehicleType } from './entities/vehicle_type.entity';

@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Post()
  async create(@Body() createVehicleTypeDto: CreateVehicleTypeDto): Promise<VehicleType>{
    return await this.vehicleTypesService.create(createVehicleTypeDto);
  }

  @Get()
  async findAll(): Promise<VehicleType[]> {
    return await this.vehicleTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleType> {
    return await this.vehicleTypesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<VehicleType> {
    return await this.vehicleTypesService.update(+id, updateVehicleTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<VehicleType> {
    return await this.vehicleTypesService.remove(+id);
  }
}
