import { union } from 'underscore';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserService } from '@/api/user/user.service';
import { RoleDto } from './dto/role.dto';
import { Role } from './entities/role.entites';
import { Permission } from './enum/permissions.enum';
import { RoleUpdateDto } from './dto/role.update.dto';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import { index } from 'quick-crud';
import paginationOptions from '@/common/helper/paginationOptions';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly model: ReturnModelType<typeof Role>,
    private readonly userService: UserService,
  ) {}

  async store(payload: RoleDto) {
    try {
      return await this.model.create(payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   *
   * @param _id role uuid
   * @returns Role
   */

  async show(_id: string) {
    try {
      const role = await this.model.findById(_id);
      return role;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async index(pagination: CommonListQueryDto) {
    try {
      return await index({
        model: this.model,
        paginationOptions: paginationOptions(pagination, {
          page: 1,
          limit: 10,
        }),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   *
   * @param _id role id
   * @returns Role
   */
  async update(_id: string, data: RoleUpdateDto) {
    const role = await this.model.updateOne(
      { _id },
      { $set: { permissions: data.permissions } },
      { new: true },
    );
    return role;
  }

  /**
   *
   * @param _id role id
   * @returns boolean
   */
  async destory(_id: string) {
    try {
      let role = await this.model.findByIdAndDelete(_id);
      return {
        message: 'Role Delete Successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   *
   * @param _id
   * @body [Permission]
   * @returns Role
   */
  async removeSpecficPermission(_id: string, data: RoleUpdateDto) {
    try {
      let role = await this.model.updateOne(
        { _id },
        { $pullAll: { permissions: data.permissions } },
      );
      return role;
    } catch (error) {
      throw new HttpException(
        'Failed to update role',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  /**
   * Check permissions by userid
   * @param userId user uuid
   * @param permissions Permission[]
   * @returns boolean
   */
  async userHasPermissions(userId: string, expectedPermissions: Permission[]) {
    const user = await this.userService
      .findById(userId)
      .select('permissions -_id')
      .populate({ path: 'role', select: 'permissions -_id' });

    const role = (await user.role) as Role;

    const userPermissions = union(user.permissions, role?.permissions);

    // Logger.log(user, 'role.service/userHasPermissions/user');
    // Logger.log(
    //   userPermissions,
    //   'role.service/userHasPermissions/userPermissions',
    // );

    if (userPermissions.includes(Permission.ADMINISTRATOR)) {
      return true;
    }

    return expectedPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
