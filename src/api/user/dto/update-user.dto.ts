import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { DOB } from '../entities/dob.entity';

export class UpdateUserDto {

    @ApiProperty()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @IsOptional()
    country?: string;

    @ApiProperty()
    @IsOptional()
    date_of_birth?: DOB

    @ApiProperty()
    @IsOptional()
    gender?: string
}
