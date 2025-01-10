import { Module } from '@nestjs/common';
import { OtherFeaturesService } from './other_features.service';
import { OtherFeaturesController } from './other_features.controller';
import { OtherFeature } from './entities/other_feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OtherFeature])],
  controllers: [OtherFeaturesController],
  providers: [OtherFeaturesService],
  exports: [TypeOrmModule]
})
export class OtherFeaturesModule {}
