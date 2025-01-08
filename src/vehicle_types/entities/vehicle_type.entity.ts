import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: 'particular', nullable: false })
    type: string;
}
