
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from 'class-validator';

export class CreateAdminDto {


    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    phone: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

}
