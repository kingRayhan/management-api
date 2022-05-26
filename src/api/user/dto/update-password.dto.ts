import { Match } from "@/common/decorators/password-match.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";


export class PasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    current_password: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    new_password: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @Match('new_password')
    confirm_password: string
}