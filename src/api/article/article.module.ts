import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '@/api/article/entities/article.entity';
import { UserModule } from '@/api/user/user.module';
import { User } from '@/api/user/entities/user.entity';
import { RoleModule } from '@/api/role/role.module';
import { ArticlePolicy } from './article.policy';

@Module({
  imports: [TypegooseModule.forFeature([Article, User]), RoleModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
