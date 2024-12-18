import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainFeaturesService } from './main_features.service';
import { CreateMainFeatureDto } from './dto/create-main_feature.dto';
import { UpdateMainFeatureDto } from './dto/update-main_feature.dto';

@Controller('main-features')
export class MainFeaturesController {
  constructor(private readonly mainFeaturesService: MainFeaturesService) {}

  @Post()
  create(@Body() createMainFeatureDto: CreateMainFeatureDto) {
    return this.mainFeaturesService.create(createMainFeatureDto);
  }

  @Get()
  findAll() {
    return this.mainFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainFeatureDto: UpdateMainFeatureDto) {
    return this.mainFeaturesService.update(+id, updateMainFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainFeaturesService.remove(+id);
  }
}
