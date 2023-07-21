import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bscrypt from "bcrypt";
import { UserService } from "../userInfo/user.service";
import { RefreshService } from "./refresh/refresh.service";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "../dto/payload.dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private refreshService: RefreshService
    ) {}

    async login(email: string, pass: string) {
        const user = await this.userService.getUserByMail(email)
        const checkPass = await bscrypt.compare(pass, user?.password)
        if(checkPass === false) {
            throw new UnauthorizedException();
        }
        const payload: Payload = { id: user.id, email: user.email };

        return await this.generateTokens(payload, user.refreshToken)
    }

    async logOut(id: number) {
        try {
            await this.userService.logout(id);
            return 'Выход успешно завершен'
        } catch {
            throw new UnauthorizedException()
        }
    }

   async generateAccessToken(payload: Payload) {
        return this.jwtService.signAsync(payload);
    }

    async generateTokens(payload: Payload, refreshToken: string) {

      const correctPayload = { id: payload.id, email: payload.email }

      this.refreshService.revokeToken(refreshToken);

        return {
           access_token: await this.generateAccessToken(correctPayload),
           refresh_token: await this.refreshService.generateRefreshToken(correctPayload)
        }
    }

    async refreshTokens(payload: Payload) {

        if(payload.refreshToken) {
          throw new UnauthorizedException();
        }

        return await this.generateTokens(payload, payload.refreshToken)
    }
}
