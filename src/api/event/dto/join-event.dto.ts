

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
    @IsNotEmpty()
    event: string;
}
