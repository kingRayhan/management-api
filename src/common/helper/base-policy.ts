import { ForbiddenException } from '@nestjs/common';
import * as Mongoose from 'mongoose';

export class BasePolicy<ModelRef> {
  private userKey;

  constructor(
    private model: Mongoose.Model<ModelRef>,
    userKey: string = 'user',
  ) {
    this.userKey = userKey;
  }

  async canDelete(
    id: Mongoose.Types.ObjectId,
    userId: Mongoose.Types.ObjectId,
  ) {
    const object = await this.model
      .findOne<ModelRef>(id)
      .populate({ path: this.userKey, select: '_id' })
      .select(this.userKey);
    if (!object) return null;

    // @ts-ignore
    if (object[this.userKey]._id.toString() !== userId.toString()) {
     
      throw new ForbiddenException('You are not authorized to perform this');
    }
    return true;
  }

  async canUpdate(
    id: Mongoose.Types.ObjectId,
    userId: Mongoose.Types.ObjectId,
  ) {
    const object = await this.model
      .findOne<ModelRef>(id)
      .populate({ path: this.userKey, select: '_id' })
      .select(this.userKey);
    if (!object) return null;

    // @ts-ignore
    if (object[this.userKey]._id.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not authorized to perform this');
    }
    return true;
  }
}
