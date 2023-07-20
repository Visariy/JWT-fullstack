import { Injectable } from '@nestjs/common';
import { UserService } from "./userInfo/user.service";
import { CreateUser} from "./dto/createUser.dto";

@Injectable()
export class AppService {

  constructor(private userService: UserService) {}

  createUser(user: CreateUser) {
      return this.userService.createUser(user);
  }

  async getUserByMail(mail: string) {
    const response = await this.userService.getUserByMail(mail);
    return response.email
  }

}
