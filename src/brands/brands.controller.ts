import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Get()
  getVendors() {
    return this.brandsService.getBrand()
  }

  @Post()
  addVendors(@Body() body) {
    return this.brandsService.addBrand(body)
  }

  @Patch(":id")
  updateVendor(@Param() param, @Body() body) {
    return this.brandsService.updateBrand(Number(param.id), body)
  }
}
