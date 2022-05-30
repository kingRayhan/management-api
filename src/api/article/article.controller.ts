import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@/common/decorators/Role.decorator';
import { Permission } from '@/api/role/enum/permissions.enum';

import { ResponseMessage } from '@/common/strings/response-message';
import Response from '@/common/helper/Response';
import { toMongooseObjectId } from '@/common/helper/global-helper';
import { Throttle } from '@nestjs/throttler';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';


@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Role([Permission.USER])
  @Throttle(10, 60)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: Request,
  ) {
    const data = await this.articleService.create(
      createArticleDto,
      req['user']['userId'],
    );

    return new Response({
      data,
      message: ResponseMessage.ARTICLE_CREATED_SUCCESSFULLY,
      status: HttpStatus.OK,
    });
  }

  @Get()
  async findAll(@Query() pagination: CommonListQueryDto) {
    const data = await this.articleService.findAll(pagination);
    return new Response({
      data,
      message: ResponseMessage.ARTICLE_FETCHED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }

  @Get(':identifier')
  async findOne(
    @Param('identifier') identifier: string,
  ) {
    const data = await this.articleService.findOne(identifier);
    return new Response({
      data,
      message: ResponseMessage.ARTICLE_FETCHED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }

  @Patch(':id')
  @Role([Permission.USER])
  @Throttle(10, 60)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req: Request,
  ) {
    const data = this.articleService.update(
      toMongooseObjectId(id),
      updateArticleDto,
      toMongooseObjectId(req['user']['userId']),
    );

    return new Response({
      data,
      message: ResponseMessage.ARTICLE_UPDATED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }

  @Delete(':id')
  @Role([Permission.USER])
  @Throttle(10, 60)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const data = await this.articleService.remove(
      toMongooseObjectId(id), // cast to mongoid
      toMongooseObjectId(req['user']['userId']),
    );
    return new Response({
      data,
      message: ResponseMessage.ARTICLE_DELETED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }
}
