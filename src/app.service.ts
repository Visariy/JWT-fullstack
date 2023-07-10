import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from "./userInfo/user.service";
import { CreateUser} from "./dto/createUser.dto";
import { UpdateUser} from "./dto/updateUser.dto";
import * as bscrypt from "bcrypt"

@Injectable()
export class AppService {

  constructor(private userService: UserService) {}

  getUsers() {
      return this.userService.findAllUsers()
  }

  getUserById(id: number) {
      return this.userService.getUserById(id)
  }

  createUser(user: CreateUser) {
      return this.userService.createUser(user);
  }


  getUserByMail(mail: string) {
    return this.userService.getUserByMail(mail);
  }

}
