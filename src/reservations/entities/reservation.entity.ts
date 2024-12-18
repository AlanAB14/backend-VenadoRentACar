import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    reservation_number: number;
  
    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    car: Car;
  
    @Column({ type: 'timestamp' })
    date_start: Date;
  
    @Column({ type: 'timestamp' })
    date_end: Date;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    phone: string;
  
    @Column({ nullable: true })
    observation: string;
}
