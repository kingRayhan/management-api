import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Register a new user
   * @param dto RegisterDTO
   * @returns
   */
  registerUser(dto: RegisterDTO) {
    return this.userService.create(dto);
  }

  /**
   * Login a user
   * @param dto LoginDTO
   */
  async login(dto: LoginDTO) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const marched = await this.sessionService.verifyPassword(
      dto.password,
      user.password,
    );

    if (!marched) throw new UnauthorizedException('Invalid credentials');

    // if (!user.is_verified)
    //   throw new NotAcceptableException('Please Verify Your Email');

    const token = await this.sessionService.createSession(user._id);
    return token;
  }

  /**
   * Refresh a user session
   * @param userId string - user id
   * @param refresh_token_secret string - old refresh token secret
   * @returns
   */
  refresh(userId: string, refresh_token_secret: string) {
    return this.sessionService.reCreateSession(userId, refresh_token_secret);
  }

  /**
   * Logout a user
   * @param session_id string - session id
   * @returns
   */
  logout(session_id: string) {
    return this.sessionService.deleteSessionBySessionId(session_id);
  }

  verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }


}
