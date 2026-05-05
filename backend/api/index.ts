import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import serverless from 'serverless-http';

let cachedHandler: any;

import { Module } from '@nestjs/common';

@Module({})
class TestModule {}

async function getApp() {
  if (cachedHandler) return cachedHandler;

  const app = await NestFactory.create(TestModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5001",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  cachedHandler = serverless(expressApp);

  return cachedHandler;
}

export default async function handler(req: any, res: any) {
  const app = await getApp();
  return app(req, res);
}