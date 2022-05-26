import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import CommonResponse from '@/common/helper/Response';

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('GlobalExceptionFilter');

    return response.status(status).json({
      test: status,
      message: 'Custom formatted exception',
    });
  }
}
