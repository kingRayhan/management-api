import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { RoleModule } from './api/role/role.module';
import { SessionModule } from './api/session/session.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminModule } from './api/admin/admin.module';

@Module({
  imports: [

    ThrottlerModule.forRoot(),
    TypegooseModule.forRoot('mongodb+srv://shuvro:shuvro@cluster0.edtjn.mongodb.net/?retryWrites=true&w=majority'),
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
   // RoleModule,
    SessionModule,
   AdminModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
