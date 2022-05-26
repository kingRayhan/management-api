import { Match } from "@/common/decorators/password-match.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class ResetPasswordDto {


    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @Length(4, 4)
    otp: string

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    password: string


    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @Match('password')
    confirm_password: string
}