import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role>{
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get()
  async findAll() : Promise<Role[]>{
    return await this.rolesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.rolesService.update(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Role>{
    return this.rolesService.remove(+id);
  }
}
