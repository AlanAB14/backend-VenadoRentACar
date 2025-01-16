import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.use('/uploads/images', express.static(join(__dirname, '..', 'uploads/images')));
  app.use('/uploads/icons', express.static(join(__dirname, '..', 'uploads/icons')));
  await app.listen(3000);
}
bootstrap();
