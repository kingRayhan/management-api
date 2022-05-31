import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CommentResource } from '@/api/comment/enum/comment-resource';
import { ResourceType } from '@/common/types/resource-types.interface';
import { CommentAttachmentType } from '../enum/comment-attachment-type';

class CommentAttachment {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsUrl()
  url?: string;

  @ApiProperty({ required: false, enum: CommentAttachmentType })
  @IsEnum(CommentAttachmentType, { each: true })
  @IsNotEmpty()
  type?: CommentAttachmentType;
}

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ required: false })
  @IsOptional()
  parent: string;

  @ApiProperty({ required: false })
  @IsOptional()
  attachment: CommentAttachment;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  resource: string;

}
