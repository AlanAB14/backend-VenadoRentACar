import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OtherFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
