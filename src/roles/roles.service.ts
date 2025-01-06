import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOneBy(createRoleDto);

    if (role) throw new ConflictException(`El rol ${ role.type } ya existe`);

    return await this.rolesRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>{
    const role = await this.rolesRepository.findOneBy({ id })
    if (!role) throw new NotFoundException(`No existe role con id ${ id }`);
    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<Role>{
    const role = await this.rolesRepository.findOneBy({ id })
    if (!role) throw new NotFoundException(`No existe role con id ${ id }`);
    return await this.rolesRepository.remove(role);
  }
}
