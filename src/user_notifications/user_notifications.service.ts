import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserNotificationDto } from './dto/create-user_notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user_notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotification } from './entities/user_notification.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserNotificationsService {

  constructor(
    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,
    private readonly events: EventEmitter2,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserNotificationDto: CreateUserNotificationDto) {
    const saved = await this.userNotificationRepository.save(createUserNotificationDto);
    this.events.emit('contact.created', saved);
    return saved;
  }

  async findAll() {
    // incluimos lastReadBy para que el front pueda mostrar nombre/email
    const list = await this.userNotificationRepository.find({
      relations: { lastReadBy: true },
      order: { created_at: 'DESC' },
    });
    // Si seguís usando “unreadIds” desde otra lógica, podés calcularlo acá.
    return {
      list,                              // notificaciones (con lastReadBy si usás relación)
      unreadIds: list.filter(n => !n.last_read_at && !n.lastReadBy).map(n => n.id),
      unreadCount: 0
    };
  }

  async findOne(id: number) {
    const notif = await this.userNotificationRepository.findOne({
      where: { id },
      relations: { lastReadBy: true },
    });
    if (!notif) throw new NotFoundException(`No se encontró notificación ${id}`);
    return notif;
  }

  async update(id: number, dto: UpdateUserNotificationDto) {
    await this.userNotificationRepository.update(id, dto);
    return this.findOne(id);
  }

  async markAsRead(notificationId: number, userId: number) {
    const notif = await this.userNotificationRepository.findOne({ where: { id: notificationId } });
    if (!notif) throw new NotFoundException(`No se encontró notificación ${notificationId}`);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`No se encontró usuario ${userId}`);

    await this.userNotificationRepository.update(notificationId, {
      lastReadBy: user,
      last_read_at: new Date(),
      // read: true, // si mantenés flag global opcional
    });

    // devolvemos la entidad fresca con relación
    return this.findOne(notificationId);
  }

  async remove(id: number) {
    const notif = await this.userNotificationRepository.findOneBy({ id });
    if (!notif) throw new NotFoundException(`No se encontro notificacion con id ${ id }`);
    return await this.userNotificationRepository.delete(id);
  }
}
