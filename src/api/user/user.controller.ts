import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Authenticated } from '@/common/decorators/authenticated.decorator';
import { Request } from 'express';
import { PrivacyDto } from './dto/privacy.dto';
import { NotificationDto } from './dto/notification.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordDto } from './dto/update-password.dto';
import Response from '@/common/helper/Response';
import { Throttle } from '@nestjs/throttler';
import { ResponseMessage } from '@/common/strings/response-message';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/me')
  @Authenticated()
  @HttpCode(HttpStatus.OK)
  async getAuthenticatedProfile(@Req() req: Request) {
    const data = await this.userService
      .findById(req['user']['userId'])
      .select('-password -otp');

    return new Response({
      data,
      status: HttpStatus.OK,
      message: ResponseMessage.USER_FETCHED_SUCCESSFULLY,
      errors: null,
    });
  }

  @Patch('settings/privacy')
  @Throttle(10, 60)
  @Authenticated()
  updateUserPrivacySettings(
    @Req() req: Request,
    @Body() privacyDTO: PrivacyDto,
  ) {
    return this.userService.updateUserPrivacySettings(
      req['user']['userId'],
      privacyDTO,
    );
  }

  @Patch('settings/notification')
  @Throttle(10, 60)
  @Authenticated()
  updateUserNotificationSettings(
    @Req() req: Request,
    @Body() notificationDTO: NotificationDto,
  ) {
    return this.userService.updateUserNotificationSettings(
      req['user']['userId'],
      notificationDTO,
    );
  }

  @Patch('settings/profile')
  @Throttle(10, 60)
  @Authenticated()
  updateUserProfile(@Req() req: Request, @Body() updateUserDTO: UpdateUserDto) {
    return this.userService.updateUserProfile(
      req['user']['userId'],
      updateUserDTO,
    );
  }

  @Patch('settings/password')
  @Throttle(10, 60)
  @Authenticated()
  updateUserPassword(@Req() req: Request, @Body() passwordDto: PasswordDto) {
    return this.userService.updatePassword(req['user']['userId'], passwordDto);
  }

  @Get('profile/:id')
  getPublicProfile() {
    return "I'm the public profile";
  }
}
