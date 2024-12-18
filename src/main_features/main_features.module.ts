import { Module } from '@nestjs/common';
import { MainFeaturesService } from './main_features.service';
import { MainFeaturesController } from './main_features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainFeature } from './entities/main_feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainFeature])],
  controllers: [MainFeaturesController],
  providers: [MainFeaturesService],
})
export class MainFeaturesModule {}
