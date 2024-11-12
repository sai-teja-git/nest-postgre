import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  saltRounds = 10;

  async addUsers(body: Prisma.UserCreateInput) {
    try {
      const hashPassword = async (password: string) => {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash
      }
      if (Array.isArray(body)) {
        for (let user of body) {
          user.password = await hashPassword(user.password)
        }
      } else {
        body.password = await hashPassword(body.password)
      }
      const data = await this.prisma.user.createMany({ data: body })
      return {
        data,
        message: "User(s) Created",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getUsers() {
    try {
      return {
        data: await this.prisma.user.findMany(),
        message: "User(s) Data Fetched",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    try {
      const hashPassword = async (password: string) => {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash
      }
      if (data.password) {
        data.password = await hashPassword(data.password as string)
      }
      await this.prisma.user.update({
        data,
        where: { id }
      })
      return {
        message: "User Data Updated",
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
