import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from "./auth/auth.service";
import { CreateUser } from "./dto/createUser.dto";
import { AuthUser } from "./dto/authUser.dto";

@Controller("public")
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(Number(id))
  }

  @Post('mail')
  async getUserByMail(@Body('email') mail: string) {
    return this.appService.getUserByMail(mail);
  }

  @Post()
  async CreateUser(@Body() user:CreateUser) {
    await this.appService.createUser(user);
  }

}
