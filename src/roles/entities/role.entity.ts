import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../../common/enums/role.enum';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType })
  type: RoleType;
}
