import { Match } from "@/common/decorators/password-match.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class DoctorApprovedDto {
    @ApiProperty()
    @IsNotEmpty()
    is_verified: boolean;

}