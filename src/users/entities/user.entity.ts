import { Exclude } from "class-transformer";
import { Role } from "src/roles/entities/role.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    @Exclude()
    password: string;
  
    @Exclude()
    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;
  
    @Exclude()
    @Column({ unique: true })
    email: string;
  
    @Exclude()
    @Column({ nullable: true })
    first_name: string;
  
    @Exclude()
    @Column({ nullable: true })
    last_name: string;
  
    @Exclude()
    @Column({ nullable: true })
    avatar: string;
  
    @Exclude()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Exclude()
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleteDate: Date;
}
