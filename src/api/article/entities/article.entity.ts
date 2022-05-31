import { ModelOptions, Pre, prop, Prop, Ref } from '@typegoose/typegoose';
import { User } from '@/api/user/entities/user.entity';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { slugify } from '@/common/helper/slugify';

import { groupBy } from 'underscore';
import { Comment } from '@/api/comment/entities/comment.entity';
import { ResourceType } from '@/common/types/resource-types.interface';

@Pre<Article>('save', function () {
  this.slug = slugify(this.title, true);
})
@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Article extends TimeStamps {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, trim: true })
  thumbnail: string;

  @Prop({ required: false })
  slug?: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ required: false, default: 0 })
  comment_count: number;


  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  



  @Prop({ ref: () => Comment, localField: '_id', foreignField: 'resource' })
  comments?: Ref<Comment>[];

  public get contentType() {
    return ResourceType.ARTICLE;
  }
}
