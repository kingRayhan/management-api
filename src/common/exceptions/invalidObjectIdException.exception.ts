import {
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from '@nestjs/common';

export class InvalidObjectIdException extends HttpException {
  constructor(msg?: string) {
    super(msg || 'Invalid object id', HttpStatus.NOT_ACCEPTABLE);
  }
}
