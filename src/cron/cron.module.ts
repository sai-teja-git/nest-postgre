import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CronController],
  providers: [CronService, PrismaService]
})
export class CronModule { }
