import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Post()
  @UseInterceptors(FileInterceptor('avatar_image')) 
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    if (file) {
      createUserDto.avatar_image = `/uploads/images/${file.filename}`;
    }
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar_image')) 
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    console.log(file)
    if (file) {
      updateUserDto.avatar_image = `/uploads/images/${file.filename}`;
    }
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
