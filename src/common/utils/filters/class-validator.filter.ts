import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

export class ClassValidatorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof BadRequestException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return response.status(status).json({
      message: 'This is the fuccking custom class validator filter',
    });
  }
}
