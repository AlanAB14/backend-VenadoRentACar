import { Role } from "src/roles/entities/role.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ nullable: true })
    first_name: string;
  
    @Column({ nullable: true })
    last_name: string;
  
    @Column({ nullable: true })
    avatar: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleteDate: Date;
}
