import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtherFeaturesService } from './other_features.service';
import { CreateOtherFeatureDto } from './dto/create-other_feature.dto';
import { UpdateOtherFeatureDto } from './dto/update-other_feature.dto';
import { OtherFeature } from './entities/other_feature.entity';

@Controller('other-features')
export class OtherFeaturesController {
  constructor(private readonly otherFeaturesService: OtherFeaturesService) {}

  @Post()
  async create(@Body() createOtherFeatureDto: CreateOtherFeatureDto): Promise<OtherFeature> {
    return await this.otherFeaturesService.create(createOtherFeatureDto);
  }

  @Get()
  async findAll(): Promise<OtherFeature[]> {
    return await this.otherFeaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OtherFeature> {
    return await this.otherFeaturesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOtherFeatureDto: UpdateOtherFeatureDto):Promise<OtherFeature> {
    return await this.otherFeaturesService.update(+id, updateOtherFeatureDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<OtherFeature> {
    return await this.otherFeaturesService.remove(+id);
  }
}
