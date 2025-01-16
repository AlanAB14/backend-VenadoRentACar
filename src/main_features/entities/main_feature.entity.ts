import { GearboxType } from "src/common/enums/gearbox.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MainFeature {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    persons: number;
  
    @Column()
    doors: number;
  
    @Column()
    luggage: number;
  
    @Column()
    air_conditioning: boolean;
  
    @Column({ type: 'enum', enum: GearboxType })
    gearbox: GearboxType;
  
    @ManyToOne(() => User, { nullable: true, eager: true })
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
