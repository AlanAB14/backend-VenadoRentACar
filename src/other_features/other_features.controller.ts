import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OtherFeaturesService } from './other_features.service';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';
import { OtherFeature } from './entities/other_feature.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatedByInterceptor } from 'src/common/updatedBy.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('other-features')
export class OtherFeaturesController {
  constructor(private readonly otherFeaturesService: OtherFeaturesService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(UpdatedByInterceptor)
  @UseInterceptors(FileInterceptor('icon')) 
  async create(
    @Body() createOtherFeatureDto: CreateOtherFeatureDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<OtherFeature> {
    createOtherFeatureDto.icon = `/uploads/icons/${file.filename}`;
    return await this.otherFeaturesService.create(createOtherFeatureDto, createOtherFeatureDto.updated_by);
  }

  @Get()
  async findAll(): Promise<OtherFeature[]> {
    return await this.otherFeaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OtherFeature> {
    return await this.otherFeaturesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('icon')) 
  async update(
    @Param('id') id: string, 
    @Body() updateOtherFeatureDto: UpdateOtherFeatureDto,
    @UploadedFile() file: Express.Multer.File
  ):Promise<OtherFeature> {
    if (file) {
      updateOtherFeatureDto.icon = `/uploads/icons/${file.filename}`;
    }
    return await this.otherFeaturesService.update(+id, updateOtherFeatureDto, updateOtherFeatureDto.updated_by);
  }
  
  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<OtherFeature> {
    return await this.otherFeaturesService.remove(+id);
  }
}
