
import { BasePolicy } from '@/common/helper/base-policy';
import * as Mongoose from 'mongoose';
import { User } from './entities/user.entity';


export class UserPolicy extends BasePolicy<User> {
  constructor(model: Mongoose.Model<User>) {
    super(model);
  }
}