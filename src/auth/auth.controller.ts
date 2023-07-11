import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request, Response, HttpException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserService } from "../userInfo/user.service";
import { AuthUser } from "../dto/authUser.dto";
import { UpdateUser } from "../dto/updateUser.dto";
import { RefreshGuard } from "./refresh/refresh.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}


  @Post('login')
  async signIn(@Body() authData: AuthUser, @Response() res) {
    const tokens = await this.authService.signIn(authData.email, authData.password);
    res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    res.json( { access_token: tokens.access_token });
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logOut(@Request() req) {
      return this.authService.logOut(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Post('update')
  updateUser(@Request() req, @Body() info: UpdateUser) {
    return this.userService.updateUserInfo(req.user.id, info);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  deleteUser(@Request() req) {
    return this.userService.deleteUserById(req.user.id);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const tokens = await this.authService.refreshTokens(req.user)
    res.cookie('refreshToken', tokens.refresh_token, { httpOnly: true });
    res.json( { access_token: tokens.access_token });
  }
}
