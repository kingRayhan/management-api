import { Role } from '@/common/decorators/Role.decorator';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { RoleUpdateDto } from './dto/role.update.dto';
import { Role as RoleEntity } from './entities/role.entites';
import { Permission } from './enum/permissions.enum';
import { RoleService } from './role.service';
import Response from '@/common/helper/Response';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Roles')
@Role([Permission.MANAGE_ROLE_AND_PERMISSION])
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Throttle(10, 60)
  store(@Body() dto: RoleDto) {
    return this.roleService.store(dto);
  }

  @Get(':_id')
  show(@Param('_id') _id: string): Promise<RoleEntity> {
    return this.roleService.show(_id);
  }

  @Get()
  async index(@Query() pagination: CommonListQueryDto) {
    const data = await this.roleService.index(pagination);

    return new Response({
      data,
      message: 'Logged fetched successfully',
      status: HttpStatus.OK,
    });
  }

  /**
   * Update a role's permissions
   * @param _id role id
   * @param data RoleUpdateDto
   * @returns
   */
  @Put('/:_id')
  @Throttle(10, 60)
  async update(@Param('_id') _id: string, @Body() data: RoleUpdateDto) {
    await this.roleService.update(_id, data);
    return new Response({
      message: 'Role updated successfully',
      status: HttpStatus.OK,
    });
  }

  @Patch('/specific/:_id')
  @Throttle(10, 60)
  async removeSpecficItem(
    @Param('_id') _id: string,
    @Body() data: RoleUpdateDto,
  ) {
    await this.roleService.removeSpecficPermission(_id, data);
    return new Response({
      message: 'Role updated successfully',
      status: HttpStatus.OK,
    });
  }

  @Delete('/:_id')
  @Throttle(10, 60)
  async destory(@Param('_id') _id: string) {
    await this.roleService.destory(_id);
    return new Response({
      message: 'Role deleted successfully',
      status: HttpStatus.OK,
    });
  }
}
