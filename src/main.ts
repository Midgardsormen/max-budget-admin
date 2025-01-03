import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { svelteTemplateEngine } from '../svelte-template-engine';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine('svelte', svelteTemplateEngine);
  app.setViewEngine('svelte');
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Max Budget Admin')
  .setDescription('API pour gérer les budgets personnels')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.BACKEND_PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running at http://localhost:${port}`);
  Logger.log(`server listening: ${await app.getUrl()}`)
}
bootstrap();