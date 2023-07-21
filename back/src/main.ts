import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  dotenv.config();
  app.enableCors({
    origin: 'https://jwt-front-987i.onrender.com',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
