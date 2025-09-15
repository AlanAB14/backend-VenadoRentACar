import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_notifications')
export class UserNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    user: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'last_read_by' })
    lastReadBy?: User | null;

    @Column({ type: 'timestamp', nullable: true })
    last_read_at?: Date | null; 
}
