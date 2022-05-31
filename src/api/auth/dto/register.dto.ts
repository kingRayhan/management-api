import { DOB } from '@/common/dtos/dob.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ParentRegisterDTO } from './parent.dto';

export class RegisterDTO extends ParentRegisterDTO {
 
  @ApiProperty()
  @IsOptional()
  expertise?: string;

  @ApiProperty()
  @IsOptional()
  certificate_no?: string;
}
