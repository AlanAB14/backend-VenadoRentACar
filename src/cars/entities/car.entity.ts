import { MainFeature } from "src/main_features/entities/main_feature.entity";
import { OtherFeature } from "src/other_features/entities/other_feature.entity";
import { VehicleType } from "src/vehicle_types/entities/vehicle_type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    image: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_day: number;
  
    @ManyToOne(() => MainFeature)
    @JoinColumn({ name: 'main_features_id' })
    main_features: MainFeature;
  
    @ManyToOne(() => OtherFeature)
    @JoinColumn({ name: 'other_features_id' })
    other_features: OtherFeature;
  
    @ManyToOne(() => VehicleType)
    @JoinColumn({ name: 'vehicle_type_id' })
    vehicle_type: VehicleType;
  
    @Column()
    updated_by: number;
  
    @Column({ type: 'timestamp' })
    created_at: Date;
}
