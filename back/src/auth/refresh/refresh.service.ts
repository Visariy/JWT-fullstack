import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../userInfo/user.service";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "../../dto/payload.dto";
import { UpdateUser } from "../../dto/updateUser.dto";

@Injectable()
export class RefreshService {
  constructor(
      private userService: UserService,
      @Inject('REFRESH_JWT_SERVICE')
      private jwtService: JwtService
  ) {}

  private revokedToken = new Set<string>();

  revokeToken(token: string) {
    this.revokedToken.add(token)
  }

  isRevoked(token:string): boolean {
    return this.revokedToken.has(token)
  }

  async generateRefreshToken(payload: Payload) {
    const user = await this.userService.getUserByMail(payload.email)

    const onlyUserUpdateInfo: UpdateUser = {
      refreshToken: user.refreshToken,
      firstName: user.firstName,
      lastName: user.lastName,
      number: user.number,
      address: user.address,
      description: user.description,
    }

    user.refreshToken = await this.jwtService.signAsync(payload)

    await this.userService.updateUserInfo(user.id, onlyUserUpdateInfo)

    return user.refreshToken
  }
}
