import { SessionService } from '@/api/session/session.service';
import { JwtRefreshTokenPayload } from '@/common/types/jwt-playload.interface';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-rt',
) {
  constructor(
    private readonly sessionService: SessionService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'base64:bO6AXxWEv48KFqE6GVC3hrU9fuhgcDGmYi7DbN01WA4=',
      ignoreExpiration: false,
      //   passReqToCallback: true,
    });
  }
  async validate(payload: JwtRefreshTokenPayload): Promise<any> {
    const secretExists = await this.sessionService.isRefreshTokenSecretExists(
      payload.refresh_token_secret,
    );
    if (!secretExists) throw new ForbiddenException('Invalid refresh token');

    return {
      userId: payload.sub,
      refresh_token_secret: payload.refresh_token_secret,
    };
  }
}
