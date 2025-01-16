import { Module } from '@nestjs/common';
import { MainFeaturesService } from './main_features.service';
import { MainFeaturesController } from './main_features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainFeature } from './entities/main_feature.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([MainFeature]), UsersModule],
  controllers: [MainFeaturesController],
  providers: [MainFeaturesService],
})
export class MainFeaturesModule {}
