import Response from '@/common/helper/Response';
import { Catch, HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationError } from 'class-validator';

@Catch()
export class ClassValidatorPipe extends ValidationPipe {
  private amaderErrorFormatter(arr: ValidationError[]): any {
    const errors: any = {};

    arr.map((errObj: any) => {
      errors[errObj['property']] = Object.keys(errObj['constraints'])
        .map((constrains) => `${errObj['constraints'][constrains]}`)
        .join('.');
    });

    return new Response({
      message: 'Payload Validation Failed',
      errors,
      data: null,
      status: HttpStatus.BAD_REQUEST,
    });
  }

  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors = this.amaderErrorFormatter(validationErrors);
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
  }
}
