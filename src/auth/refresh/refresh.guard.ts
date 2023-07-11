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

  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(this.jwtService);
    if(!token) {
      throw new UnauthorizedException();
    }
    if(this.refreshService.isRevoked(token)) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token);
      console.log(request['user'])
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
