import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshService } from "./refresh.service";
import { UserModule } from "../userInfo/user.module";
import { refreshController } from "./refresh.controller";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('REFRESH_SECRET'),
          signOptions: { expiresIn: '15d' },
        }
      },
      inject: [ConfigService],
    })
  ],
  controllers: [refreshController],
  providers: [
    RefreshService,
    {
      provide: 'REFRESH_JWT_SERVICE',
      useExisting: JwtService,
    },
  ],
  exports: [RefreshService]
})
export class RefreshModule {}
