import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../userInfo/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";
import { AuthController } from "./auth.controller";
import { RefreshModule } from "../refresh/refresh.module";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    RefreshModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        }
      },
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: 'ACCESS_JWT_SERVICE',
      useExisting: JwtService,
    },
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
