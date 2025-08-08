import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import * as bcryptjs from 'bcryptjs';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { role_id,  password, ...userData } = createUserDto;
    const role = await this.roleRepository.findOne({ where: { id: role_id } });

    if (!role) throw new NotFoundException('Rol inexistente');

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = this.userRepository.create({
      password: hashPassword,
      role,
      ...userData,
      avatar: createUserDto.avatar_image ?? null,
    });

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) : Promise<User>{
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No existe usuario con id: ${ id }`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const usuario = await this.userRepository.findOneBy({ id });
    if ( !usuario ) throw new NotFoundException(`No existe usuario con id ${ id }`);
    if (updateUserDto.avatar_image) {
      if (usuario.avatar) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', 'images', path.basename(usuario.avatar));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      usuario.avatar = updateUserDto.avatar_image;
    }

    if ( updateUserDto.role_id ) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserDto.role_id } });
      if (!role) throw new NotFoundException('Rol no encontrado');
      usuario.role = role;
    }

    if ( updateUserDto.first_name ) {
      usuario.first_name = updateUserDto.first_name;
    }

    if ( updateUserDto.last_name ) {
      usuario.last_name = updateUserDto.last_name;
    }

    if ( updateUserDto.username ) {
      usuario.username = updateUserDto.username;
    }

    if ( updateUserDto.password ) {
      const hashPassword = await bcryptjs.hash(updateUserDto.password, 10);
      usuario.password = hashPassword;
    }


    return await this.userRepository.save(usuario);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No existe usuario con id: ${ id }`);
    return await this.userRepository.softDelete(id);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({username});
    if (!user) throw new NotFoundException(`No existe el usuario ${ username }`);
    return user;
  }
}
