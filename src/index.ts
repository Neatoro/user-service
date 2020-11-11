import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  if (process.env.NODE_ENV !== 'development') {
    app.use(helmet());
  }

  const port = configService.get('PORT', 8080);
  app.listen(port);
}
bootstrap();
