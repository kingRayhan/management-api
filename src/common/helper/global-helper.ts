import * as mongoose from 'mongoose';

export function toMongooseObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}
