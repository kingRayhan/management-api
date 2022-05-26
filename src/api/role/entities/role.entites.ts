import { ModelOptions, prop } from '@typegoose/typegoose';
import { Permission } from '@/api/role/enum/permissions.enum';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Role {
  @prop({ required: true })
  public name: string;

  @prop({ required: false })
  public permissions: Permission[];
}
