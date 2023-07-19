import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { RefreshService } from "./refresh.service";

@Injectable()
export class RefreshGuard implements CanActivate {

  constructor(
    @Inject('REFRESH_JWT_SERVICE')
    private jwtService: JwtService,
    private refreshService: RefreshService
  ) {}

  public extractTokenFromCookie(request: Request): any {
      const arr = (request.headers.cookie.split(';'));
      let refreshToken = ''
      for(let i = 0; i < arr.length; i++) {
        const [type, token] = arr[i].split('=')
        if(type.trim() === 'refreshToken') {
          refreshToken = token
          break;
        }
      }
      return refreshToken
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if(!token) {
      throw new UnauthorizedException();
    }
    if(this.refreshService.isRevoked(token)) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
