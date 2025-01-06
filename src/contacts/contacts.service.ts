import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}


  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return await this.contactRepository.save(createContactDto);
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
