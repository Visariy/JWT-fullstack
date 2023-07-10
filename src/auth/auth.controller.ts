import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request, HttpException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserService } from "../userInfo/user.service";
import { AuthUser } from "../dto/authUser.dto";
import { UpdateUser } from "../dto/updateUser.dto";
import { RefreshGuard } from "../refresh/refresh.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}


  @Post('login')
  signIn(@Body() authData: AuthUser) {
    return this.authService.signIn(authData.email, authData.password);
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
  refreshToken(@Request() req) {
    return this.authService.refreshTokens(req.user)
  }
}
