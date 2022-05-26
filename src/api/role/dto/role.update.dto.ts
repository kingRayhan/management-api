import { Permission } from '@/api/role/enum/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class RoleUpdateDto {
  @ApiProperty({ enum: Permission })
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
