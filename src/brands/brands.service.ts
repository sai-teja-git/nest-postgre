import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {

    constructor(private readonly prisma: PrismaService) { }

    async addBrand(body: Prisma.BrandCreateManyInput) {
        try {
            const data = await this.prisma.brand.createMany({ data: body })
            return {
                data,
                message: "Brand(s) Created",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async getBrand() {
        try {
            return {
                data: await this.prisma.brand.findMany(),
                message: "Brand(s) Data Fetched",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async updateBrand(id: number, data: Prisma.ProductUpdateInput) {
        try {
            await this.prisma.brand.update({
                data,
                where: { id }
            })
            return {
                message: "Brand Data Updated",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

}
