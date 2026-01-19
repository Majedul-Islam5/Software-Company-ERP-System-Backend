import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DebugFilter } from './hr/debug.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: "http://localhost:5001",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  app.useGlobalFilters(new DebugFilter());//to check the error type in postman


  await app.listen(process.env.PORT ?? 4001);
  
}
bootstrap();
