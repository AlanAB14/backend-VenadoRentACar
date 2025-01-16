import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehicleTypesService } from './vehicle_types.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';
import { VehicleType } from './entities/vehicle_type.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
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

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<VehicleType> {
    return await this.vehicleTypesService.update(+id, updateVehicleTypeDto);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<VehicleType> {
    return await this.vehicleTypesService.remove(+id);
  }
}
