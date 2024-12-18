import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtherFeaturesService } from './other_features.service';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';

@Controller('other-features')
export class OtherFeaturesController {
  constructor(private readonly otherFeaturesService: OtherFeaturesService) {}

  @Post()
  create(@Body() createOtherFeatureDto: CreateOtherFeatureDto) {
    return this.otherFeaturesService.create(createOtherFeatureDto);
  }

  @Get()
  findAll() {
    return this.otherFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtherFeatureDto: UpdateOtherFeatureDto) {
    return this.otherFeaturesService.update(+id, updateOtherFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherFeaturesService.remove(+id);
  }
}
