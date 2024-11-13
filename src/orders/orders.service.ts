import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    async addOrder(body: Prisma.OrderCreateManyInput) {
        try {
            const data = await this.prisma.order.createMany({ data: body })
            return {
                data,
                message: "Order(s) Created",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async getOrder() {
        try {
            return {
                data: await this.prisma.order.findMany(),
                message: "Order(s) Data Fetched",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async updateOrder(id: number, data: Prisma.ProductUpdateInput) {
        try {
            await this.prisma.order.update({
                data,
                where: { id }
            })
            return {
                message: "Order Data Updated",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

    async getOrderDetails() {
        try {
            const products = await this.prisma.order.findMany({
                where: {
                    status: {
                        in: ["delivered", "replaced"]
                    }
                },
                select: {
                    discountPercent: true,
                    rating: true,
                    status: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                            vendor: {
                                select: { name: true }
                            }
                        }
                    }
                }
            })
            const data = products
            return {
                data,
                message: "Order(s) Fetched",
                status: HttpStatus.OK
            }
        } catch (error) {
            throw new HttpException(error.message, error.status ?? 500)
        }
    }

}
