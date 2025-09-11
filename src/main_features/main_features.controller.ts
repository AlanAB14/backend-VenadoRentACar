import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { MainFeaturesService } from './main_features.service';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';
import { MainFeature } from './entities/main_feature.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatedByInterceptor } from 'src/common/updatedBy.interceptor';

@Controller('main-features')
export class MainFeaturesController {
  constructor(private readonly mainFeaturesService: MainFeaturesService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(UpdatedByInterceptor)
  async create(@Body() createMainFeatureDto: CreateMainFeatureDto): Promise<MainFeature> {
    return await this.mainFeaturesService.create(createMainFeatureDto, createMainFeatureDto.updated_by);
  }

  @Get()
  async findAll(): Promise<MainFeature[]> {
    return await this.mainFeaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MainFeature> {
    return await this.mainFeaturesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(UpdatedByInterceptor)
  async update(@Param('id') id: string, @Body() updateMainFeatureDto: UpdateMainFeatureDto): Promise<MainFeature> {
    return await this.mainFeaturesService.update(+id, updateMainFeatureDto, updateMainFeatureDto.updated_by);
  }

  @UseGuards(AuthGuard)
  @Roles('super_admin')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MainFeature> {
    return await this.mainFeaturesService.remove(+id);
  }
}
