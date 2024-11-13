import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorsService {

  constructor(private readonly prisma: PrismaService) { }

  async addVendors(body: Prisma.VendorCreateManyInput) {
    try {
      const data = await this.prisma.vendor.createMany({ data: body })
      return {
        data,
        message: "Vendor(s) Created",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getVendors() {
    try {
      return {
        data: await this.prisma.vendor.findMany(),
        message: "Vendor(s) Data Fetched",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async updateVendor(id: number, data: Prisma.VendorUpdateInput) {
    try {
      await this.prisma.vendor.update({
        data,
        where: { id }
      })
      return {
        message: "Vendor Data Updated",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getVendorsRating() {
    try {
      const data = await this.prisma.order.findMany({})
      return {
        data,
        message: "Vendor(s) Data Fetched",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
