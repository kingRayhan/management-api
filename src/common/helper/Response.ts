import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from '../strings/response-message';

interface IResponseConstructor {
  status: HttpStatus;
  message?: ResponseMessage | string;
  data?: object;
  errors?: object;
}

export default class Response {
  public status: HttpStatus;
  public message?: ResponseMessage | string;
  public data?: object;
  public errors?: object;

  constructor({
    data = {},
    status,
    message = null,
    errors = {},
  }: IResponseConstructor) {
    this.message = message;
    this.status = status;
    this.data = data ? data : {};
    this.errors = errors;
  }
}
