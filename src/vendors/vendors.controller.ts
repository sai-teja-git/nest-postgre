import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) { }

  @Get("rating")
  getVendorsRating() {
    return this.vendorsService.getVendorsRating()
  }

  @Get()
  getVendors() {
    return this.vendorsService.getVendors()
  }

  @Post()
  addVendors(@Body() body) {
    return this.vendorsService.addVendors(body)
  }

  @Patch(":id")
  updateVendor(@Param() param, @Body() body) {
    return this.vendorsService.updateVendor(Number(param.id), body)
  }
}
