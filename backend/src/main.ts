import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // enables class-transformer transformations
      transformOptions: {
        enableImplicitConversion: true, // converts plain types to the target type
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
