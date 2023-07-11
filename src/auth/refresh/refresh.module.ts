import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
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
  providers: [
    {
      provide: 'REFRESH_JWT_SERVICE',
      useExisting: JwtService,
    },
  ],
  exports:['REFRESH_JWT_SERVICE']
})
export class RefreshModule {}
