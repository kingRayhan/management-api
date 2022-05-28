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

export class RegisterDTO {
 

  @ApiProperty()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  last_name: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  expertise: string;

  @ApiProperty()
  @IsNotEmpty()
  certificate_no: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  // @ApiProperty()
  // @IsOptional()
  // is_verified: string;


}
