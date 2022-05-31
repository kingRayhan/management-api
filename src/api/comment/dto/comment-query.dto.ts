import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@/common/types/resource-types.interface';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';


export class CommentQueryDto extends CommonListQueryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  resource: string;

}
