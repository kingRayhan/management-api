import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto {

    @ApiProperty()
    @IsOptional()
    first_name?: string;

    @ApiProperty()
    @IsOptional()
    last_name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    phone?: string;

    @ApiProperty()
    @IsOptional()
    expertise?: string;

    @ApiProperty()
    @IsOptional()
    certificate_no?: string

    @ApiProperty()
    @IsOptional()
    is_verified: boolean;
}
