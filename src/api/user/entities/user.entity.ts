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



@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@Pre<User>('save', function () {
  this.password = hashSync(this.password, 10);

  this.permissions = [ Permission.DOCTOR]

})
@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })

export class User {

  @prop({ required: true })
  first_name: string;

  @prop({ required: false })
  last_name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: false, unique: false })
  phone: string;

  @prop({ required: false })
  expertise: string;

  @prop({ required: false })
  certificate_no: string;

  @prop({ required: true })
  password: string;


  @prop({ default: false })
  is_verified: boolean;

  @prop({ ref: () => Role, required: false })
  role: Ref<Role>;

  @prop({ required: false })
  permissions: Permission[];
}
