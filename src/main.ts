import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import * as cowSay from 'cowsay';
import { ConfigService } from '@nestjs/config';
import { ClassValidatorPipe } from '@/common/utils/pipes/ClassValidatorPipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '/mail/mail-templates'));

  app.useGlobalPipes(new ClassValidatorPipe());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new ConfigService();
  app.enableCors();

  const docConfig = new DocumentBuilder()
    .setTitle('Hospital Mnagement API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);

  const cow = cowSay.say({
    text: `Server running`,
    e: 'oO',
    T: 'U ',
  });

  console.log(cow);
}
bootstrap();
