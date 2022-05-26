import { Permission } from '@/api/role/enum/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: String;

  @ApiProperty({ enum: Permission, isArray: true })
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
