import { Module } from '@nestjs/common';
import { OtherFeaturesService } from './other_features.service';
import { OtherFeaturesController } from './other_features.controller';
import { OtherFeature } from './entities/other_feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/middlewares/multer-configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtherFeature]), 
    UsersModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [OtherFeaturesController],
  providers: [OtherFeaturesService],
  exports: [TypeOrmModule]
})
export class OtherFeaturesModule {}
