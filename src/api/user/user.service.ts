import { slugify } from '@/common/helper/slugify';
import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SessionService } from '../session/session.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotificationDto } from './dto/notification.dto';
import { PrivacyDto } from './dto/privacy.dto';
import { PasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync } from 'bcryptjs';
import { OTPDto } from '../auth/dto/otp.dto';
import { generateOTP } from '@/common/helper/otp-generator';
import { ValidateOTPDto } from '../auth/dto/validate-otp.dto';
import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { OTPException } from '@/common/exceptions/otp.exception';


import { ResetPasswordDto } from '../auth/dto/reset.dto';
const config = new ConfigService();
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
    private readonly sessionService: SessionService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { raw_otp, hash_otp } = generateOTP();
    const payload = { otp: hash_otp, ...createUserDto };
    const user = await this.model.create(payload);
    return user;
  }

  async sendOtpEmailToUser(username: string, otp: string){
    // this.event.emit(
    //   EventType.OTP_MAIL,
    //   new OTPMailEvent(
    //     createUserDto.email,
    //     `Welcome ${createUserDto.name}`,
    //     'OTP',
    //     {
    //       name: raw_otp,
    //     },
    //   ),
    // );
  }

  /**
   * Find User by email
   * @param email string
   * @returns
   */
  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  /**
   * Find User by id
   * @param id string
   * @returns
   */
  findById(id: string) {
    return this.model.findById(id);
  }

  /**
   * @param id string
   *
   * @body privacyDto: Privacy
   */
  async updateUserPrivacySettings(_id: string, privacyDto: PrivacyDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();

    user.settings.privacy = { ...user.settings.privacy, ...privacyDto };

    await this.model.findByIdAndUpdate(_id, user);
    return {
      message: 'Privacy settings updated',
      data: user.settings.privacy,
    };
  }

  /**
   * @param id string
   *
   * @body notificationDto: NotificationDto
   */
  async updateUserNotificationSettings(
    _id: string,
    notificationDto: NotificationDto,
  ) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();

    user.settings.notification = {
      ...user.settings.notification,
      ...notificationDto,
    };

    await this.model.findByIdAndUpdate(_id, user);
    return {
      message: 'Notification settings updated',
      data: user.settings.notification,
    };
  }

  /**
   * @param id string
   *
   * @body updateUserProfileDto: UpdateUserProfileDto
   */

  async updateUserProfile(_id: string, updateUserProfileDto: UpdateUserDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
    if (updateUserProfileDto.username) {
      const unique = await this.uniqueCheck(updateUserProfileDto.username);
      if (unique) {
        updateUserProfileDto.username = slugify(
          updateUserProfileDto.username,
          true,
        );
      }
    }
    const updateUser = await this.model.findByIdAndUpdate(
      _id,
      updateUserProfileDto,
      { new: true },
    );
    return {
      message: 'User profile updated',
      data: updateUser,
    };
  }

  /**
   *
   * @param id string
   * @body dto: PasswordDto
   */

  async updatePassword(_id: string, dto: PasswordDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
    const matched = await this.sessionService.verifyPassword(
      dto.current_password,
      user.password,
    );
    if (!matched) throw new ForbiddenException('Current password is incorrect');

    user.password = hashSync(dto.new_password, 10);
    await this.model.findByIdAndUpdate(_id, user);
    return {
      message: 'Password updated',
    };
  }

  /**
   *
   * @param username string
   */
  async uniqueCheck(username: string) {
    const user = await this.model.findOne({ username });
    return user ? true : false;
  }

  /**
   * Check is a user exits or not by any property
   * @param query object
   * @returns
   */
  async isUserExists(query: any): Promise<boolean> {
    const user = await this.model.exists(query);
    return user ? true : false;
  }

  /**
   * Remove user by any property
   * @param query object
   * @returns
   */
  removeUser(query: any) {
    return this.model.deleteOne(query);
  }

  async generateOtp(data: OTPDto) {
    const user = await this.model.findOne({ email: data.email });

    if (!user)
      throw new NotFoundException(
        'There is no user registered with that email address.',
      );

    if (user.is_verified) {
      throw new HttpException(
        'Already Email Valided',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { raw_otp, hash_otp } = generateOTP();
    await this.model.findByIdAndUpdate(user.id, { otp: hash_otp });
    return true;
  }

  async validateOtp(data: ValidateOTPDto) {
    const user = await this.model.findOne({ email: data.email });
    let decode;
    if (!user)
      throw new NotFoundException(
        'There is no user registered with that email address.',
      );

    try {
      decode = JWT.verify(user.otp, config.get('APP_SECRET'));
    } catch (error) {
      throw new ForbiddenException('Time expired');
    }

    if (data.otp == decode['otp']) {
      await this.model.findByIdAndUpdate(user.id, {
        otp: null,
        is_verified: true,
      });
      return 'Verified';
    } else {
      throw new OTPException();
    }
  }

  async generateForgotOtp(data: OTPDto) {
    try {
      const user = await this.model.findOne({ email: data.email });
      if (!user) throw new NotFoundException('Not a Valid Email');
      const { raw_otp, hash_otp } = generateOTP();
      await this.model.findByIdAndUpdate(user.id, {
        reset_password_hash: hash_otp,
      });
      return {
        message: 'Check Your Email',
      };
    } catch (error) {
      return error.response;
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    let decode = null;
    const user = await this.model.findOne({ email: data.email });
    if (!user) throw new NotFoundException('Not a Valid Email');

    try {
      decode = JWT.verify(user.reset_password_hash, config.get('APP_SECRET'));
    } catch (error) {
      return {
        message: 'Time expired',
      };
    }

    if (data.otp == decode['otp']) {
      const password = hashSync(data.password, 10);
      await this.model.findByIdAndUpdate(user.id, {
        reset_password_hash: null,
        password,
        otp: null,
        is_verified: true,
      });
      return {
        message: 'Successfully Forgot Password',
      };
    } else {
      throw new OTPException();
    }
  }
}
