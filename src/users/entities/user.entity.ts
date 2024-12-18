import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;
  
    @Column()
    email: string;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column({ nullable: true })
    avatar: string;
  
    @Column({ type: 'timestamp' })
    created_at: Date;
}
