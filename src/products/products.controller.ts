import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getVendors() {
    return this.productsService.getProducts()
  }

  @Post()
  addVendors(@Body() body) {
    return this.productsService.addProducts(body)
  }

  @Patch(":id")
  updateVendor(@Param() param, @Body() body) {
    return this.productsService.updateProduct(Number(param.id), body)
  }
}
