import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotificationsModule } from 'src/user_notifications/user_notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), UserNotificationsModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
