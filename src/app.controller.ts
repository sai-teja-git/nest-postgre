import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello() {
    return {
      status: HttpStatus.OK,
      message: "Server Here!"
    };
  }
}
