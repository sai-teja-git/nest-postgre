import { HttpStatus, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { $Enums, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {

    insertIndex = 1;

    constructor(
        private readonly prisma: PrismaService
    ) { }

    @Interval((10) * 1000)
    async handleInterval() {
        const statusData = ["delivered", "canceled", "returned", "replaced"];
        for (let i = 0; i < 10; i++) {
            const orders: Prisma.OrderCreateManyInput[] = [];
            const userId = this.randomIntNumber(1, 5);
            const productId = this.randomIntNumber(1, 602);
            const rating = this.randomIntNumber(1, 5);
            const discountPercent = this.randomIntNumber(1, 15);
            const statusInd = i % 2 == 0 ? this.randomIntNumber(0, 3) : this.randomIntNumber(0, 1)
            orders.push({
                userId,
                productId,
                discountPercent,
                rating,
                status: statusData[statusInd] as $Enums.orderStatus
            })
            if (statusInd === 3) {
                const statusReInd = this.randomIntNumber(0, 2)
                orders.push({
                    userId,
                    productId,
                    discountPercent,
                    rating,
                    status: statusData[statusReInd] as $Enums.orderStatus
                })
            }
            try {
                const data = await this.prisma.order.createMany({ data: orders })
                console.table({
                    sno: this.insertIndex,
                    count: data.count,
                    message: "Order(s) Created",
                    status: HttpStatus.OK,
                    on: new Date().toISOString()
                })
                this.insertIndex++;
            } catch (error) {
                console.log('orders', orders)
                console.error(error.message)
            }
        }
    }

    randomFloatNumber(min, max, offSet: null | number = null) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.random() * (max - min + 1) + min;
        if (offSet === null) {
            return random
        }
        return random.toFixed(offSet)
    }

    randomIntNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
