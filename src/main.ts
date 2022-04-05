import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: String(process.env.CLIENT_URL), credentials: true });

  const swagger = new DocumentBuilder()
    .setTitle('team 2')
    .setDescription('Second command documentation')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
}

start();
