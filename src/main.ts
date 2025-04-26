import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { initSecurityConfig } from './startup/security.config';
import { initSwaggerConfig } from './startup/swagger.cofig';
import { initGlobalConfig } from './startup/global.config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://micadmin.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  initSecurityConfig(app);

  initSwaggerConfig(app);

  initGlobalConfig(app);

  // Augmenter la limite de taille du corps de la requête
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '51mb', extended: true }));

  await app.listen(process.env.PORT);
}
bootstrap();
