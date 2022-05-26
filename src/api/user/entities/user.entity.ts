import { Role } from '@/api/role/entities/role.entites';
import { Permission } from '@/api/role/enum/permissions.enum';
import { slugify } from '@/common/helper/slugify';
import {
  index,
  ModelOptions,
  Pre,
  prop,
  plugin,
  Ref,
} from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as UniqueValidator from 'mongoose-unique-validator';
import { DOB } from './dob.entity';
import { NotificationEntity } from './notification.entity';
import { Privacy } from './privacy.entity';

export enum gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@Pre<User>('save', function () {
  this.password = hashSync(this.password, 10);
  this.username = slugify(this.name, true);
  this.settings = {
    privacy: {
      show_comments: true,
      show_following: true,
      blocklists: [],
      disabled_at: Date.now(),
    },
    notification: {
      like: true,
      following_and_followers: true,
      comments: true,
      newsrme: false,
      email_sms: true,
    },
  };
  this.permissions = [Permission.UPDATE_PRIVACY_SETTINGS, Permission.UPDATE_NOTIFICATION_SETTINGS, Permission.UPDATE_PROFILE, Permission.UPDATE_PASSWORD, Permission.CREATE_ARTICLE, Permission.UPDATE_ARTICLE, Permission.DELETE_ARTICLE, Permission.CREATE_VIDEO, Permission.DELETE_VIDEO, Permission.UPDATE_VIDEO, Permission.CREATE_AUDIO, Permission.UPDATE_AUDIO, Permission.DELETE_AUDIO, Permission.POST_COMMENT, Permission.DELETE_COMMENT, Permission.UPDATE_COMMENT, Permission.FETCH_NOTIFICATION, Permission.GET_WALLET]

})
@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })
@index({ email: 1, username: 1 }, { unique: true })
export class User {
  @prop()
  avatar?: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop()
  address: string;

  @prop({ required: true })
  country: string;

  @prop({ required: true })
  date_of_birth?: DOB;

  @prop({ required: true, enum: gender })
  gender: string;

  @prop()
  settings?: {
    privacy: Privacy;
    notification: NotificationEntity;
  };

  @prop({ default: null })
  reset_password_hash: string;

  @prop()
  otp: string;

  @prop({ default: false })
  is_verified: boolean;

  @prop({ ref: () => Role, required: false })
  role: Ref<Role>;

  @prop({ required: false })
  permissions: Permission[];
}
