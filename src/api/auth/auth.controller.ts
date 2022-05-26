import { Authenticated } from '@/common/decorators/authenticated.decorator';
import Response from '@/common/helper/Response';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { OTPDto } from './dto/otp.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset.dto';
import { ValidateOTPDto } from './dto/validate-otp.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @Throttle(5, 60)
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDTO) {
    const data = await this.authService.registerUser(dto);


    return new Response({
      status: HttpStatus.OK,
      data,
      message: 'Register successfully',
      errors: null,
    });
  }

  @Post('login')
  // @Throttle(2, 60)
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDTO) {
    const data = await this.authService.login(dto);
    return new Response({
      data,
      status: HttpStatus.OK,
      message: 'Login successfully',
      errors: null,
    });
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-rt'))
  @HttpCode(HttpStatus.OK)
  @Throttle(5, 60)
  async refresh(@Req() req: Request) {
    const data = await this.authService.refresh(
      req['user']['userId'],
      req['user']['refresh_token_secret'],
    );
    return new Response({
      data,
      status: HttpStatus.OK,
      message: 'New token generated successfully',
      errors: null,
    });
  }

  @Post('logout')
  @Authenticated()
  @HttpCode(HttpStatus.OK)
  // @Throttle(5, 60)
  async logout(@Req() req: Request) {
    await this.authService.logout(req['user']['session_id']);
    return new Response({
      status: HttpStatus.OK,
      message: 'Logout successfully',
      errors: null,
      data: null,
    });
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle(5, 60)
  async generateForgotPasswordOTP(@Body() data: OTPDto) {
    await this.authService.forgotOTPGenerate(data);
    return new Response({
      status: HttpStatus.OK,
      message: 'An OTP has been sent to your email',
      errors: null,
      data: null,
    });
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Throttle(5, 60)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return new Response({
      status: HttpStatus.OK,
      message: 'Password reset successfully',
      errors: null,
      data: null,
    });
  }

  @Post('otp')
  @HttpCode(HttpStatus.OK)
  @Throttle(5, 60)
  async generateOtp(@Body() data: OTPDto) {
    await this.authService.otpGenerate(data);
    return new Response({
      status: HttpStatus.OK,
      message: 'An OTP has been sent to your email',
      errors: null,
      data: null,
    });
  }

  @Post('verify-otp')
  @Throttle(5, 60)
  async verifyOTP(@Body() data: ValidateOTPDto) {
    await this.authService.verifyOTP(data);
    return new Response({
      status: HttpStatus.OK,
      message: 'OTP verified successfully',
      errors: null,
      data: null,
    });
  }
}
