import { Module } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CarImagesController } from './car-images.controller';
import { CarImage } from './entities/car-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/middlewares/multer-configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarImage]),
    UsersModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [CarImagesController],
  providers: [CarImagesService],
  exports: [TypeOrmModule]
})
export class CarImagesModule {}
