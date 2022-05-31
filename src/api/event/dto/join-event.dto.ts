

import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from 'class-validator';

export class JoinEventDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsOptional()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    age: string;

    @ApiProperty()
    @IsNotEmpty()
    type: string;
}
