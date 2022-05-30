import { InvalidObjectIdException } from '@/common/exceptions/invalidObjectIdException.exception';
import { toMongooseObjectId } from '@/common/helper/global-helper';
import { IsValidObjectId } from '@/common/helper/Is-valid-object-id';
import PaginatedResource from '@/common/types/PaginatedResource.interface';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { index } from 'quick-crud';
import { CommentQueryDto } from './dto/comment-query.dto';
import DatabaseRepository from '@/common/database/database-repo';
import { CommentPolicy } from './comment.policy';
import mongoose from 'mongoose';

@Injectable()
export class CommentService {
  private readonly commentPolicy: CommentPolicy;
  private databaseRepository: DatabaseRepository<Comment>;

  constructor(
    @InjectModel(Comment)
    private readonly model: ReturnModelType<typeof Comment>,
  ) {
    this.commentPolicy = new CommentPolicy(this.model);
    this.databaseRepository = new DatabaseRepository<Comment>(this.model);
  }

  async create(payload: CreateCommentDto, userId: string) {
    const { id } = await this.model.create({
      ...payload,
      ...{ user: toMongooseObjectId(userId) },
    });

    return this.findOne(id);
  }

  async findAll(query: CommentQueryDto): Promise<PaginatedResource<Comment>> {
    return this.databaseRepository.getObjectList(
      {
        page: query.page,
        limit: query.limit,
        sort: query.sort,
        fields: query.fields,
      },
      {
        sort: { createdAt: query.sort },
        resource: query.resource,
      },
      { path: 'user', select: 'name username email avatar' },
    );
  }

  findOne(id: number) {
    return this.databaseRepository.getObject(
      { _id: toMongooseObjectId(id) },
      { path: 'user', select: 'name username email avatar' },
    );
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
    userId: mongoose.Types.ObjectId,
  ) {
    if (!IsValidObjectId(id)) throw new InvalidObjectIdException();

    await this.commentPolicy.canDelete(id, userId);

    const dbRepository = new DatabaseRepository<Comment>(this.model);
    return dbRepository.updateObject(
      { _id: toMongooseObjectId(id) },
      updateCommentDto,
    );
  }

  async remove(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    await this.commentPolicy.canDelete(id, userId);

    const dbRepository = new DatabaseRepository<Comment>(this.model);

    return dbRepository.deleteObject({ _id: id });
  }
}
