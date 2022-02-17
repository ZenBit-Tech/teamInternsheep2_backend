import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() //Swagger
      .setTitle('team 2')
      .setDescription('Документация 2 команды')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  // http://localhost:8000/api/docs/  -просмотр доки
SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
