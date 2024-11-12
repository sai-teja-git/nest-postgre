import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async addProductCategory(body: Prisma.ProductCategoryCreateManyInput) {
        try {
            const data = await this.prisma.productCategory.createMany({ data: body })
            return {
                data,
                message: "Product Category(s) Created",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async getProductCategory() {
        try {
            return {
                data: await this.prisma.productCategory.findMany(),
                message: "Product Category(s) Data Fetched",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async updateProductCategory(id: number, data: Prisma.ProductUpdateInput) {
        try {
            await this.prisma.productCategory.update({
                data,
                where: { id }
            })
            return {
                message: "Product Category Data Updated",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }
}
