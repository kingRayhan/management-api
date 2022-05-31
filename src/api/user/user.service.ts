import { slugify } from '@/common/helper/slugify';
import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SessionService } from '../session/session.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync } from 'bcryptjs';

import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { OTPException } from '@/common/exceptions/otp.exception';
import { ResetPasswordDto } from '../auth/dto/reset.dto';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import DatabaseRepository from '@/common/database/database-repo';
const config = new ConfigService();
@Injectable()
export class UserService {

  private databaseRepository: DatabaseRepository<User>

  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
    private readonly sessionService: SessionService
  ) {
    this.databaseRepository = new DatabaseRepository<User>(this.model);
  }

  async create(createUserDto: CreateUserDto) {

    const user = await this.model.create(createUserDto);
    return user;
  }



  /**
   * Find All Users
   * 
   * @returns User
   */

  findAll(query: CommonListQueryDto){
    return this.databaseRepository.getObjectList(
      {
        page: query.page,
        limit: query.limit,
        sort: query.sort,
        fields: query.fields,
      }
    );
  }


  /**
   * Find User by email
   * @param email string
   * @returns
   */
  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  /**
   * Find User by id
   * @param id string
   * @returns
   */
  findById(id: string) {
    return this.model.findById(id).select('-permissions -password');
  }

  


  /**
   * @param id string
   *
   * @body updateUserProfileDto: UpdateUserProfileDto
   */

  async updateUserProfile(_id: string, updateUserProfileDto: UpdateUserDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
  
    const updateUser = await this.model.findByIdAndUpdate(
      _id,
      updateUserProfileDto,
      { new: true },
    );
    return {
      message: 'User profile updated Successfully',
      data: updateUser,
    };
  }

  /**
   *
   * @param id string
   * @body dto: PasswordDto
   */

  async updatePassword(_id: string, dto: PasswordDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
    const matched = await this.sessionService.verifyPassword(
      dto.current_password,
      user.password,
    );
    if (!matched) throw new ForbiddenException('Current password is incorrect');

    user.password = hashSync(dto.new_password, 10);
    await this.model.findByIdAndUpdate(_id, user);
    return {
      message: 'Password updated',
    };
  }

  /**
   *
   * @param username string
   */
  async uniqueCheck(username: string) {
    const user = await this.model.findOne({ username });
    return user ? true : false;
  }

  /**
   * Check is a user exits or not by any property
   * @param query object
   * @returns
   */
  async isUserExists(query: any): Promise<boolean> {
    const user = await this.model.exists(query);
    return user ? true : false;
  }

  /**
   * Remove user by any property
   * @param query object
   * @returns
   */
  removeUser(query: any) {
    return this.model.deleteOne(query);
  }

  

}
