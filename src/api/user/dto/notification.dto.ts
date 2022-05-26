import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class NotificationDto {
    @ApiProperty()
    @IsOptional()
    like: boolean

    @ApiProperty()
    @IsOptional()
    following_and_followers: boolean

    @ApiProperty()
    @IsOptional()
    comments: boolean

    @ApiProperty()
    @IsOptional()
    newsrme: boolean

    @ApiProperty()
    @IsOptional()
    email_sms: boolean
}