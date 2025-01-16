import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatedByInterceptor } from 'src/common/updatedBy.interceptor';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CarImage } from './entities/car-image.entity';

@Controller('car-images')
export class CarImagesController {
  constructor(private readonly carImagesService: CarImagesService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(UpdatedByInterceptor)
  @UseInterceptors(FilesInterceptor('imageUrl', 6)) 
  async create(
    @Body() createCarImageDto: CreateCarImageDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<CarImage[]> {
    const imageUrls = files.map((file) => `/uploads/images/${file.filename}`);
    createCarImageDto.imageUrl = imageUrls;

    return await this.carImagesService.create(createCarImageDto, createCarImageDto.updated_by);
  }

  @Get()
  findAll() {
    return this.carImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carImagesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCarImageDto: UpdateCarImageDto) {
  //   return this.carImagesService.update(+id, updateCarImageDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carImagesService.remove(+id);
  }
}
