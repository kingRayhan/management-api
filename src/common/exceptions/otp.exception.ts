import { HttpException, HttpStatus } from '@nestjs/common';

export class OTPException extends HttpException {
  constructor(msg?: string) {
    super(msg || 'OTPException', HttpStatus.FORBIDDEN);
  }
}
