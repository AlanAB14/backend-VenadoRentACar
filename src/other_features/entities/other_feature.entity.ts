import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  updated_by: number;
}
