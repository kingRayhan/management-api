
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from 'class-validator';

export class Status {
    @ApiProperty()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsOptional()
    issue: string;
}

export class EventDate {
    @ApiProperty()
    @IsNotEmpty()
    day: string;

    @ApiProperty()
    @IsNotEmpty()
    month: string;

    @ApiProperty()
    @IsNotEmpty()
    year: string;
}


export class CreateEventDto {


    @ApiProperty()
    @IsNotEmpty()
    event_name: string;

    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    status: Status;

    @ApiProperty()
    @IsNotEmpty()
    date: EventDate;

}
