import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class ValidateOTPDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Length(4, 4)
    otp: string

}