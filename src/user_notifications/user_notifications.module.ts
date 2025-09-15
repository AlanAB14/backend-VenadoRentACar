import { Module } from '@nestjs/common';
import { UserNotificationsService } from './user_notifications.service';
import { UserNotificationsController } from './user_notifications.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UserNotification } from './entities/user_notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserNotification]), NotificationsModule, UsersModule],
  controllers: [UserNotificationsController],
  providers: [UserNotificationsService],
  exports: [UserNotificationsService],
})
export class UserNotificationsModule {}
