import { BasePolicy } from '@/common/helper/base-policy';
import * as Mongoose from 'mongoose';
import { Comment } from './entities/comment.entity';

export class CommentPolicy extends BasePolicy<Comment> {
  constructor(model: Mongoose.Model<Comment>) {
    super(model);
  }
}
