import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  // @ApiProperty({
  //   default: false,
  //   description:
  //     'By default refresh token age is 7 days. Set true for 30 days aged refresh token',
  // })
  // @MinLength(6)
  // rember: boolean;
}
