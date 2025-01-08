import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainFeaturesService } from './main_features.service';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';
import { MainFeature } from './entities/main_feature.entity';

@Controller('main-features')
export class MainFeaturesController {
  constructor(private readonly mainFeaturesService: MainFeaturesService) {}

  @Post()
  async create(@Body() createMainFeatureDto: CreateMainFeatureDto): Promise<MainFeature> {
    return await this.mainFeaturesService.create(createMainFeatureDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MainFeature> {
    return await this.mainFeaturesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMainFeatureDto: UpdateMainFeatureDto): Promise<MainFeature> {
    return await this.mainFeaturesService.update(+id, updateMainFeatureDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MainFeature> {
    return await this.mainFeaturesService.remove(+id);
  }
}
