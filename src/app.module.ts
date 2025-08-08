import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CarsModule } from './cars/cars.module';
import { MainFeaturesModule } from './main_features/main_features.module';
import { OtherFeaturesModule } from './other_features/other_features.module';
import { VehicleTypesModule } from './vehicle_types/vehicle_types.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './common/middlewares/multer-configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user_crud",
      password: "root",
      database: "db_rent_a_car",
      autoLoadEntities: true,
      synchronize: true,
      timezone: '-03:00' //Zona horaria de Argentina
    }),
    RolesModule,
    UsersModule,
    ContactsModule,
    ReservationsModule,
    CarsModule,
    MainFeaturesModule,
    OtherFeaturesModule,
    VehicleTypesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
