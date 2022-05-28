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
import { RegisterDTO } from './dto/register.dto';
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

}
