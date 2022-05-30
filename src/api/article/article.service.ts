import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '@/api/article/entities/article.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { IsValidObjectId } from '@/common/helper/Is-valid-object-id';

import { toMongooseObjectId } from '@/common/helper/global-helper';
import PaginatedResource from '@/common/types/PaginatedResource.interface';
import DatabaseRepository from '@/common/database/database-repo';
import { ArticlePolicy } from './article.policy';
import * as mongoose from 'mongoose';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';


@Injectable()
export class ArticleService {
  private readonly articlePolicy: ArticlePolicy;
  private databaseRepository: DatabaseRepository<Article>;

  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
  ) {
    this.articlePolicy = new ArticlePolicy(this.articleModel);
    this.databaseRepository = new DatabaseRepository<Article>(
      this.articleModel,
    );
  }

  create(createArticleDto: CreateArticleDto, userId: string) {
    return this.articleModel.create({
      ...createArticleDto,
      ...{ user: toMongooseObjectId(userId) },
    });
  }

  async findAll(
    pagination: CommonListQueryDto,
  ): Promise<PaginatedResource<Article>> {
    return this.databaseRepository.getObjectList(pagination);
  }

  async findOne(identifier: string) {
    return this.databaseRepository.getObject(
      IsValidObjectId(identifier)
        ? { _id: toMongooseObjectId(identifier) }
        : { slug: identifier },

      [
        { path: 'categories', select: 'name slug' },
        { path: 'user', select: 'name username email avatar' },
        { path: 'bookmarks', select: 'user -resource' },
        { path: 'reactions', select: 'user -resource type' },
      ],
    );
  }

  async update(
    id: mongoose.Types.ObjectId,
    payload: UpdateArticleDto,
    userId: mongoose.Types.ObjectId,
  ) {
    this.articlePolicy.canUpdate(id, userId);
    const dbRepo = new DatabaseRepository<Article>(this.articleModel);
    return dbRepo.updateObject({ _id: toMongooseObjectId(id) }, payload);
  }

  async remove(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    await this.articlePolicy.canDelete(id, userId);
    const dbRepo = new DatabaseRepository<Article>(this.articleModel);
    return dbRepo.deleteObject({ _id: toMongooseObjectId(id) });
  }

  async incrementCommentCountById(id: string) {
    return await this.articleModel.findOneAndUpdate(
      { _id: toMongooseObjectId(id) },
      { $inc: { comment_count: 1 } },
    );
  }
  async decrementCommentCountById(id: string) {
    return await this.articleModel.findOneAndUpdate(
      { _id: toMongooseObjectId(id) },
      { $inc: { comment_count: -1 } },
    );
  }
}
