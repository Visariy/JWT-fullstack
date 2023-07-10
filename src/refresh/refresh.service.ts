import { Injectable } from "@nestjs/common";
import { UserService } from "../userInfo/user.service";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "../dto/payload.dto";


@Injectable()
export class RefreshService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async generateRefreshToken(payload: Payload) {
    const user = await this.userService.getUserByMail(payload.email)

    user.refreshToken = await this.jwtService.signAsync(payload)

    await this.userService.updateUserInfo(user.id, user)

    return user.refreshToken
  }
}
