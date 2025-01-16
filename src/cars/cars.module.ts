import { forwardRef, Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { VehicleTypesModule } from 'src/vehicle_types/vehicle_types.module';
import { OtherFeaturesModule } from 'src/other_features/other_features.module';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/middlewares/multer-configuration';
import { CarImagesModule } from 'src/car-images/car-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    VehicleTypesModule,
    OtherFeaturesModule,
    CarImagesModule,
    UsersModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [TypeOrmModule],
})
export class CarsModule {}
