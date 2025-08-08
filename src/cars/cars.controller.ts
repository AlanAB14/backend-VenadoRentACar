import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatedByInterceptor } from 'src/common/updatedBy.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/middlewares/multer-configuration';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(UpdatedByInterceptor)
  @UseInterceptors(FilesInterceptor('images')) 
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    if (files) {
      const filePaths = files.map(file => `/uploads/images/${file.filename}`);
      createCarDto.images = filePaths as any;
    }
    return this.carsService.create(createCarDto, createCarDto.updated_by);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(UpdatedByInterceptor)
  @UseInterceptors(FilesInterceptor('images')) 
  async update(
    @Param('id') id: string, 
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    if (files) {
      const filePaths = files.map(file => `/uploads/images/${file.filename}`);
      updateCarDto.images = filePaths as any;
    }
    return await this.carsService.update(+id, updateCarDto, updateCarDto.updated_by);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
