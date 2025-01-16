import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarImage } from './entities/car-image.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CarImagesService {

  constructor(
    @InjectRepository(CarImage)
    private readonly carImageRepository: Repository<CarImage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createCarImageDto: CreateCarImageDto, userId: number): Promise<CarImage[]> {
    const userUpdated = await this.userRepository.findOne({ where: { id: userId } })
    const carImages = createCarImageDto.imageUrl.map((url) =>
      this.carImageRepository.create({
        imageUrl: url,
        updated_by: userUpdated, // Relación con el usuario
      }),
    );

    return await this.carImageRepository.save(carImages);
  }

  async findAll(): Promise<CarImage[]> {
    const carImages = await this.carImageRepository.find(); 
    return plainToClass(CarImage, carImages);
  }

  async findOne(id: number): Promise<CarImage> {
    const carImage = await this.carImageRepository.findOneBy({ id });
    if (!carImage) throw new NotFoundException(`No se encontro imagen con id ${ id }`);
    return plainToClass(CarImage, carImage);
  }

  // async update(id: number, updateCarImageDto: UpdateCarImageDto, userId: number): Promise<CarImage> {
  //   const carImage = await this.carImageRepository.findOneBy({ id });
  //   const userUpdated = await this.userRepository.findOne({ where: { id: userId } });

  //   if (updateCarImageDto.imageUrl && carImage.imageUrl) {
  //     const filePath = path.join(__dirname, '..', '..', 'uploads', 'images', path.basename(carImage.imageUrl));
  //     if (fs.existsSync(filePath)) {
  //       fs.unlinkSync(filePath);
  //     }
  //   }

  //   if (!carImage) throw new NotFoundException(`No se encontro imagen con id ${ id }`);
  //   Object.assign(carImage, updateCarImageDto, {
  //     updated_by: userUpdated
  //   });

  //   return await this.carImageRepository.save(carImage);
  // }

  async remove(id: number): Promise<CarImage> {
    const carImage = await this.carImageRepository.findOneBy({ id })
    if (!carImage) throw new NotFoundException(`No existe imagen con id ${ id }`);
    return await this.carImageRepository.remove(carImage);
  }
}
