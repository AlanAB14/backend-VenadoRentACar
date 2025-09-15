import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserNotificationsService } from './user_notifications.service';
import { CreateUserNotificationDto } from './dto/create-user_notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user_notification.dto';

@Controller('user-notifications')
export class UserNotificationsController {
  constructor(private readonly userNotificationsService: UserNotificationsService) {}

  @Post()
  create(@Body() createUserNotificationDto: CreateUserNotificationDto) {
    return this.userNotificationsService.create(createUserNotificationDto);
  }

  @Get()
  findAll() {
    return this.userNotificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userNotificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserNotificationDto: UpdateUserNotificationDto) {
    return this.userNotificationsService.update(+id, updateUserNotificationDto);
  }

  @Post(':id/read')
  markAsRead(@Param('id') id: string, @Body() body: {userId: number}) {
    return this.userNotificationsService.markAsRead(+id, body.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userNotificationsService.remove(+id);
  }
}
