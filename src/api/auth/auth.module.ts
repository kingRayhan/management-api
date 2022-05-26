import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { JwtAccessTokenStrategy } from './passport-strategies/jwt-at.strategy';
import { JwtRefreshTokenStrategy } from './passport-strategies/jwt-rt.strategy';

@Module({
  imports: [UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
