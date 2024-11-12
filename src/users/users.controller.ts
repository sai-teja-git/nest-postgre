import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @Post()
  addUsers(@Body() body) {
    return this.usersService.addUsers(body)
  }

  @Patch(":id")
  updateUser(@Param() param, @Body() body) {
    return this.usersService.updateUser(Number(param.id), body)
  }

}
