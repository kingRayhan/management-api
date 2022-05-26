import { User } from '@/api/user/entities/user.entity';
import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Session {
  _id?: string;

  @prop({ required: true })
  refresh_token_secret: string;

  @prop()
  client?: string;

  @prop({ required: true, ref: () => User })
  subscriber: User;

  // TODO: add expiration to this model
}
