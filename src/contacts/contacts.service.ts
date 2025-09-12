import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserNotification } from 'src/user_notifications/entities/user_notification.entity';
import { UserNotificationsService } from 'src/user_notifications/user_notifications.service';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly userNotificationsService: UserNotificationsService,
  ) {}


  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const saved = await this.contactRepository.save(createContactDto);

    await this.userNotificationsService.create({
      type: 'contacto',
      user: createContactDto.name,
    });

    return saved;
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) throw new NotFoundException(`No se encontro contacto con id ${ id }`);
    return contact;
  }

  async remove(id: number) {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) throw new NotFoundException(`No se encontro contacto con id ${ id }`);
    return await this.contactRepository.softDelete(id);
  }
}
