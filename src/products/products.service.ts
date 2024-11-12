import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async addProducts(body: Prisma.ProductCreateManyInput) {
    try {
      const data = await this.prisma.product.createMany({ data: body })
      return {
        data,
        message: "Product(s) Created",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getProducts() {
    try {
      return {
        data: await this.prisma.product.findMany(),
        message: "Product(s) Data Fetched",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async updateProduct(id: number, data: Prisma.ProductUpdateInput) {
    try {
      await this.prisma.product.update({
        data,
        where: { id }
      })
      return {
        message: "Product Data Updated",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
