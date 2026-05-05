import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DebugFilter } from '../src/hr/debug.filter';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  const app = await NestFactory.create(AppModule);

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

  // KEEP FILTER REMOVED FOR NOW
  // app.useGlobalFilters(new DebugFilter());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  cachedApp = expressApp;

  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}