import { Permission } from '@/api/role/enum/permissions.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../guards/role.guard';

export const Role = (permissions: Permission[]) => {
  return applyDecorators(
    UseGuards(AuthGuard('jwt-at')),
    UseGuards(RoleGuard),
    SetMetadata('permissions', permissions),
    ApiBearerAuth(),
  );
};
