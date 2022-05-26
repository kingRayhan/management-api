import { Prop } from '@typegoose/typegoose';

export class NotificationEntity {
  @Prop()
  like: boolean;

  @Prop()
  following_and_followers: boolean;

  @Prop()
  comments: boolean;

  @Prop()
  newsrme: boolean;

  @Prop()
  email_sms: boolean;
}

