import { VehicleTextType } from "src/common/enums/vehicleTextType.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: VehicleTextType })
    type: VehicleTextType;
}
