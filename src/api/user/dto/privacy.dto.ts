import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class PrivacyDto {
    @ApiProperty()
    @IsOptional()
    show_comments: boolean

    @ApiProperty()
    @IsOptional()
    show_following: boolean

    @ApiProperty()
    @IsOptional()
    blocklists: []

    @ApiProperty()
    @IsOptional()
    disabled_at: number
}