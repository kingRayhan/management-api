import { Permission } from '@/api/role/enum/permissions.enum';
import { RoleService } from '@/api/role/role.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const expectedPermissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );

    const hasPermissions = await this.roleService.userHasPermissions(
      request.user.userId,
      expectedPermissions,
    );
    return hasPermissions;
  }
}
