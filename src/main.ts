// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import * as cowSay from 'cowsay';
import { ConfigService } from '@nestjs/config';
import { ClassValidatorPipe } from '@/common/utils/pipes/ClassValidatorPipe';

const doc = `
<br/>

### Common Querystring Parameters
<br/>
#### ?fields=column1,column2,column3
Limit the number of columns returned.

- Example: ?fields=id name email
  - Returns: { id, name, email }
- Example: ?fields=id name
  - Returns: { id, name }
- Example: /videos?fields=-description -attachments
  - Returns: returns all columns except description and attachments

<br/>

#### ?filter=field:operation=value;field:operation=value
Filter data by field and operation.

**Example**
- /videos?filter=views:gt=10;category:in=6288c8b05ac91afa0da3d8c5

**operators: Comparison**
- **eq** - Matches values that are equal to a specified value.
- **gt** - Matches values that are greater than a specified value.
- **gte** - Matches values that are greater than or equal to a specified value.
- **in** - Matches any of the values specified in an array.
- **lt** - Matches values that are less than a specified value.
- **lte** - Matches values that are less than or equal to a specified value.
- **ne** - Matches all values that are not equal to a specified value.
- **nin** - Matches none of the values specified in an array.


**operators: Element**
- **exists** - Matches documents that have the specified field. 
  - When <boolean> is true, **exists** matches the documents that contain the field, including documents where the field value is null. 
  - If <boolean> is false, the query returns only the documents that do not contain the field
  - **Example**: /videos?filter=thumbnail:exists=true

**operators: Array**
- **all** - Matches all elements of an array to a specified value.
  - **Example**: Filter all videos those have all of these categories 
  - /videos?filter=categories:all=6288c8b85ac91afa0da3d8df,6288c8b05ac91afa0da3d8c5
- **size** - Matches arrays with the number of elements specified by the value.
  - **Example**: Filter all videos that have more than 3 categories
  - /videos?filter=categories:size=3

#### ?aggregate=field1:coulumn1,coulumn2,,,;field2:coulumn2,coulumn3
Aggregate data by field and operation.
- Example: ?aggregate=user:name,email
  - Returns: { user: { name, email } }
- Example: ?aggregate=user:name,email;categories:name
  - Returns: { user: { name, email }, categories: { name } }
`;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '/mail/mail-templates'));

  app.useGlobalPipes(new ClassValidatorPipe());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new ConfigService();
  app.enableCors();

  const docConfig = new DocumentBuilder()
    .setTitle('Newsrme API')
    .setDescription(doc)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(config.get('PORT'));

  const cow = cowSay.say({
    text: `Server running: ${config.get('APP_URL')} | ${config.get(
      'APP_URL',
    )}/api-documentation`,
    e: 'oO',
    T: 'U ',
  });

  console.log(cow);
}
bootstrap();
