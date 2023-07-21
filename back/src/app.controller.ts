import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from "./dto/createUser.dto";

@Controller("public")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async CreateUser(@Body() user:CreateUser) {
    await this.appService.createUser(user);
  }

}
