import { MainFeature } from "src/main_features/entities/main_feature.entity";
import { OtherFeature } from "src/other_features/entities/other_feature.entity";
import { User } from "src/users/entities/user.entity";
import { VehicleType } from "src/vehicle_types/entities/vehicle_type.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'simple-array', nullable: true })
    images?: string[];
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_day: number;

    @Column({default: true})
    availability: boolean;
  
    @ManyToOne(() => MainFeature, { eager: true })
    @JoinColumn({ name: 'main_features' })
    main_features?: MainFeature;
  
    @ManyToMany(() => OtherFeature, { eager: true })
    @JoinTable({
        name: 'car_other_features',
        joinColumn: {
            name: 'car_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'other_features_id',
            referencedColumnName: 'id'
        }
     })
    other_features?: OtherFeature[];
  
    @ManyToMany(() => VehicleType, { eager: true })
    @JoinTable({ 
        name: 'car_vehicle_types',    
        joinColumn: {
            name: 'car_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'vehicle_type_id',
            referencedColumnName: 'id',
        },
    })
    vehicle_type: VehicleType[];
  
    @ManyToOne(() => User, { nullable: true, eager: true })
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleteDate: Date;
}
