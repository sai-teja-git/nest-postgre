import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) { }

  @Get()
  getVendors() {
    return this.productCategoryService.getProductCategory()
  }

  @Post()
  addVendors(@Body() body) {
    return this.productCategoryService.addProductCategory(body)
  }

  @Patch(":id")
  updateVendor(@Param() param, @Body() body) {
    return this.productCategoryService.updateProductCategory(Number(param.id), body)
  }
}
