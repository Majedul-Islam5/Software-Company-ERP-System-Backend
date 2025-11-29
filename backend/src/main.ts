import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DebugFilter } from './hr/debug.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  app.useGlobalFilters(new DebugFilter());//to check the error type in postman


  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
