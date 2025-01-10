import { Car } from "src/cars/entities/car.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '0' })
    reservation_number: string;
  
    @ManyToOne(() => Car, { eager: true })
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

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleteDate: Date;
}
