import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceIsNotMineException extends HttpException {
  constructor(msg?: string) {
    super(msg || 'ResourceIsNotMineException', HttpStatus.FORBIDDEN);
  }
}
