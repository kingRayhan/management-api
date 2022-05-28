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
@Pre<Admin>('save', function () {
  this.password = hashSync(this.password, 10);
})
@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })

export class Admin {

  @prop({ required: true })
  name: string;


  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: false, unique: false })
  phone: string;

  @prop({ required: true })
  password: string;

}
