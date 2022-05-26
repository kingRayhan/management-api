import { Prop } from '@typegoose/typegoose';

export class DOB {
  @Prop()
  day: number;

  @Prop()
  month: number;

  @Prop()
  year: number;
}
