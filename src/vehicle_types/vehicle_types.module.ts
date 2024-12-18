import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle_types.service';
import { VehicleTypesController } from './vehicle_types.controller';
import { VehicleType } from './entities/vehicle_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
