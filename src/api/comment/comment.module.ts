import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from '@/api/comment/entities/comment.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypegooseModule.forFeature([Comment]), RoleModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
