import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { VendorsModule } from './vendors/vendors.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { BrandsModule } from './brands/brands.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // ScheduleModule.forRoot(),
    UsersModule,
    VendorsModule,
    ProductsModule,
    ProductCategoryModule,
    BrandsModule,
    CronModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule { }
