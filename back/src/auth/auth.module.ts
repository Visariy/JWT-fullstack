import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../userInfo/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";
import { AuthController } from "./auth.controller";
import { RefreshModule } from "./refresh/refresh.module";
import { RefreshService } from "./refresh/refresh.service";
import { RefreshGuard } from "./refresh/refresh.guard";

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
    RefreshService,
    RefreshGuard,
    {
      provide: 'ACCESS_JWT_SERVICE',
      useExisting: JwtService,
    },
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
