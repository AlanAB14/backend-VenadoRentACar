import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { ReservationResponseDto } from './dto/response-reservation.dto';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { car, date_start, date_end, ...reservationData } = createReservationDto;
    const carFound = await this.carRepository.findOne({ where: { id: car } });
    if (!carFound) throw new NotFoundException(`No existe auto con id ${ car }`);

    const dateStart = new Date(date_start);
    const dateEnd = new Date(date_end);
    
    const timeDifference = dateEnd.getTime() - dateStart.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const totalPrice = daysDifference * carFound.price_per_day;

    const reservation = this.reservationRepository.create({
      car: carFound,
      date_start,
      date_end,
      total_price: totalPrice,
      ...reservationData
    }); 

    const savedReservation = await this.reservationRepository.save(reservation);

    const reservationNumber = `RN-${savedReservation.id.toString().padStart(7, '0')}`; // Ejemplo: RN-000001
    savedReservation.reservation_number = reservationNumber;
    await this.reservationRepository.save(savedReservation);

    return { reservation_code: reservationNumber };
  }

  async findAll(): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationRepository .createQueryBuilder('reservation')
    .leftJoinAndSelect('reservation.car', 'car')
    .select([
      'reservation.id',
      'reservation.date_start',
      'reservation.date_end',
      'reservation.total_price',
      'reservation.name',
      'reservation.email',
      'reservation.phone',
      'car.name',
    ])
    .getRawMany();


  return reservations.map((res) => ({
    id: res.reservation_id,
    date_start: res.reservation_date_start,
    date_end: res.reservation_date_end,
    total_price: res.reservation_total_price,
    name: res.reservation_name,
    email: res.reservation_email,
    phone: res.reservation_phone,
    car_name: res.car_name, // El nombre del auto
    }));
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if ( !reservation ) throw new NotFoundException(`No se encontró reserva con id ${ id }`)
    return reservation;
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) throw new NotFoundException(`No existe reserva con id: ${ id }`);
    return await this.reservationRepository.softDelete(id);
  }
}
