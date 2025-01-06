import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import * as bcryptjs from 'bcryptjs';

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

    if ( updateUserDto.role_id ) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserDto.role_id } });
      if (!role) throw new NotFoundException('Rol no encontrado');
      usuario.role = role;
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
}
