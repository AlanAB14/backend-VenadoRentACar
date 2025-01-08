import { GearboxType } from "src/common/enums/gearbox.enum";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
  
    @Column()
    updated_by: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
