import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ExpressAdapter } from '@nestjs/platform-express';  
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  await app.init();
  await app.listen(3001);
}
bootstrap();
