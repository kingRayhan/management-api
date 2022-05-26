import { Injectable, Logger } from '@nestjs/common';
import { Session } from './entities/Session.entity';
import { compareSync, hashSync } from 'bcryptjs';
import { SessionToken } from '@/common/types/SessionToken.interface';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { sign as jwtSign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private readonly model: ReturnModelType<typeof Session>,
  ) { }

  async createSession(userId: string): Promise<SessionToken> {
    const refresh_token_secret = this.generateRefreshTokenSecret(userId);

    const { _id: session_id } = await this.model.create({
      refresh_token_secret,
      subscriber: userId,
    });


    const { access_token, refresh_token } = await this.createToken(
      userId,
      refresh_token_secret,
      session_id,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Regenerate refresh token for a given user id
   * @param subscriber User - user
   * @param old_refresh_token_secret string - old refresh token secret
   * @returns
   */
  async reCreateSession(
    userId: string,
    old_refresh_token_secret: string,
  ): Promise<SessionToken> {
    // Delete old refresh token secret
    await this.model.deleteOne({ old_refresh_token_secret });

    const refresh_token_secret = this.generateRefreshTokenSecret(userId);

    const { _id: session_id } = await this.model.create({
      refresh_token_secret,
      subscriber: userId,
    });

    // Generate new refresh and access token
    const { access_token, refresh_token } = await this.createToken(
      userId,
      refresh_token_secret,
      session_id,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  verifyPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  /**
   * Create acceess and refresh token for a user id
   * @param userId string - user id
   * @returns Access and refresh token
   */
  createToken(
    userId: string,
    refresh_token_secret: string,
    session_id: string,
  ): SessionToken {
    const config = new ConfigService();

    const access_token = jwtSign(
      { sub: userId, session_id },
      config.get('APP_SECRET'),
      {
        expiresIn: config.get('ACCESS_TOKEN_EXPIRATION'),
      },
    );

    const refresh_token = jwtSign(
      { sub: userId, refresh_token_secret },
      config.get('RT_SECRET'),
      {
        expiresIn: config.get('REFRESH_TOKEN_EXPIRATION'),
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Check is a the given refresh token is valid
   * @param refresh_token_secret string - refresh token secret
   * @returns boolean
   */
  async isRefreshTokenSecretExists(
    refresh_token_secret: string,
  ): Promise<boolean> {
    const session = await this.model.findOne({ refresh_token_secret });
    return !!session;
  }

  /**
   * Check is a the given session id is valid
   * @param session_id string - refresh token secret
   * @returns boolean
   */
  async isSessionIdExists(session_id: string): Promise<boolean> {
    const session = await this.model.findOne({ _id: session_id });
    return !!session;
  }

  /**
   * Generate a new refresh token secret for a given user id
   * @param userId string - user id
   * @returns
   */
  generateRefreshTokenSecret(userId: string) {
    return hashSync(userId + '-' + Date.now(), 10);
  }

  /**
   * Delete a session by session id
   * @param session_id string - session id
   * @returns
   */
  deleteSessionBySessionId(session_id: string) {
    return this.model.deleteOne({ _id: session_id });
  }
}
