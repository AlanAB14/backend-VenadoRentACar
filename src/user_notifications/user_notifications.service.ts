import { Injectable } from '@nestjs/common';
import { CreateUserNotificationDto } from './dto/create-user_notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user_notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotification } from './entities/user_notification.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserNotificationsService {

  constructor(
    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,
    private readonly events: EventEmitter2,
  ) {}

  async create(createUserNotificationDto: CreateUserNotificationDto) {
    const saved = await this.userNotificationRepository.save(createUserNotificationDto);
    this.events.emit('contact.created', saved);
    return saved;
  }

  async findAll() {
    return await this.userNotificationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userNotification`;
  }

  update(id: number, updateUserNotificationDto: UpdateUserNotificationDto) {
    return `This action updates a #${id} userNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} userNotification`;
  }
}
