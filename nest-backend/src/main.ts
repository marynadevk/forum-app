import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CLIENT_BASE_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(configService.get<string>('PORT') ?? 3000);
}

bootstrap();
