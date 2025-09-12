import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
