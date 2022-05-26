import { DOB } from '@/common/dtos/dob.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty()
  @IsNotEmpty()
  gender: string;
}
