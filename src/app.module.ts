import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { RoleModule } from './api/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    // AuthModule,
   // UserModule,
  //  RoleModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
