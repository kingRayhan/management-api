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

  @ApiProperty({
    required: false,
    description: 'See Documentation for filter property',
  })
  @IsOptional()
  filter?: string;

  @ApiProperty({
    required: false,
    description:
      'Aggregate foreign keys for embedding relational data. See Documentation for aggregate property',
  })
  @IsOptional()
  aggregate?: string;
}
