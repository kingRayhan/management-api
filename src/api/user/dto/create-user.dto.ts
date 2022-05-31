import { Permission } from '@/api/role/enum/permissions.enum';
import { DOB } from '@/common/dtos/dob.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsEnum,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
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
  @IsOptional()
  expertise?: string;

  @ApiProperty()
  @IsOptional()
  certificate_no?: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Permission, isArray: true })
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[];

  // @ApiProperty()
  // @IsOptional()
  // is_verified: string;
}
