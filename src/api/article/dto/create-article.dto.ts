import { Prop } from '@typegoose/typegoose';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @Length(5, 300)
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsOptional()
  body: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

}
