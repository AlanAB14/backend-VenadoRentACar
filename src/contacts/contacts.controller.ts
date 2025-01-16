import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @UseGuards(AuthGuard)
  @Roles('guest')
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('guest')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
