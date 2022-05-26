import { Prop } from '@typegoose/typegoose';

export class Privacy {
  @Prop()
  show_comments: boolean;

  @Prop()
  show_following: boolean;

  @Prop()
  blocklists: String[];

  @Prop()
  disabled_at: number;
}

