import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { VehicleTypesModule } from 'src/vehicle_types/vehicle_types.module';
import { OtherFeaturesModule } from 'src/other_features/other_features.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), VehicleTypesModule, OtherFeaturesModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [TypeOrmModule]
})
export class CarsModule {}
