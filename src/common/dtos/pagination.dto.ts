import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommonListQueryDto {
  @ApiProperty({ required: true, default: 1 })
  @IsOptional()
  page: number;

  @ApiProperty({ required: true, default: 15 })
  @IsOptional()
  limit: number;

  @ApiProperty({ required: false, default: '-createdAt' })
  @IsOptional()
  sort: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fields: string;

}
