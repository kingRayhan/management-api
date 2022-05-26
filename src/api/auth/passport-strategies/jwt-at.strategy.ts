import { SessionService } from '@/api/session/session.service';
import { JwtAccessTokenPayload } from '@/common/types/jwt-playload.interface';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-at',
) {
  constructor(
    private readonly sessionService: SessionService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
      ]),
      secretOrKey: config.get<string>('APP_SECRET'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: JwtAccessTokenPayload): Promise<any> {
    const sessionIsExists = await this.sessionService.isSessionIdExists(
      payload.session_id,
    );
    if (!sessionIsExists)
      throw new ForbiddenException(
        'Access token is invalid or expired or blacklisted',
      );

    return { userId: payload.sub, session_id: payload.session_id };
  }
}
