import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./userInfo/user.module";
import {HashPasswordMiddleware} from "./hash-password/hash-password.middleware";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth/auth.controller";
import { RefreshModule } from './refresh/refresh.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    RefreshModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
      consumer.apply(HashPasswordMiddleware).forRoutes({path: 'public', method: RequestMethod.POST})
  }

}
