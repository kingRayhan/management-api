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

enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export class RegisterDTO {
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  date_of_birth: DOB;

  @ApiProperty({ enum: GENDER, isArray: false, default: GENDER.MALE })
  @IsEnum(GENDER)
  gender: GENDER;
}
