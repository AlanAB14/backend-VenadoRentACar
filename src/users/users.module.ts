import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/middlewares/multer-configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    RolesModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
