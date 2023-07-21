import { Controller, Get, Post, Body, UseGuards, Request, Response } from "@nestjs/common";
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
  async login(@Body() authData: AuthUser, @Response() res) {
    const tokens = await this.authService.login(authData.email, authData.password);
    res.cookie('refreshToken', tokens.refresh_token, {httpOnly: true, sameSite: 'none', secure: true})
    res.json({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token, userInfo: authData.email })
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
  @Get('user')
  async getUserById(@Request() req) {
    const response = await this.userService.getUserById(Number(req.user.id))
    const user = {
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      description: response.description,
      address: response.address,
      number: response.number
    }
    return user
  }

  @UseGuards(AuthGuard)
  @Get('delete')
  deleteUser(@Request() req) {
    return this.userService.deleteUserById(req.user.id);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const tokens = await this.authService.refreshTokens(req.user)
    res.cookie('refreshToken', tokens.refresh_token, {httpOnly: true, sameSite: 'none', secure: true});
    res.json( { accessToken: tokens.access_token });
  }
}
