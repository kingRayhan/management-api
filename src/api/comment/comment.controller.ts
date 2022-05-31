import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { Permission } from '../role/enum/permissions.enum';
import { Role } from '@/common/decorators/Role.decorator';

import { Comment } from './entities/comment.entity';
import PaginatedResource from '@/common/types/PaginatedResource.interface';
import { CommentQueryDto } from './dto/comment-query.dto';
import Response from '@/common/helper/Response';
import { ResponseMessage } from '@/common/strings/response-message';
import { toMongooseObjectId } from '@/common/helper/global-helper';
import { Throttle } from '@nestjs/throttler';


import { ResourceType } from '@/common/types/resource-types.interface';


@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @Role([Permission.USER])
  @Throttle(10, 60)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const data = await this.commentService.create(
      createCommentDto,
      req['user']['userId'],
    );

    return new Response({
      data,
      message: ResponseMessage.COMMENT_CREATED_SUCCESSFULLY,
      status: HttpStatus.CREATED,
      errors: null,
    });
  }

  @Get()
  async findAll(@Query() pagination: CommentQueryDto) {
    const data = await this.commentService.findAll(pagination);
    return new Response({
      data,
      message: ResponseMessage.COMMENT_FETCHED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }

  @Patch(':id')
  @Throttle(10, 60)
  @Role([Permission.USER])
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request,
  ) {
    const data = await this.commentService.update(
      toMongooseObjectId(id),
      updateCommentDto,
      toMongooseObjectId(req['user']['userId']),
    );
    return new Response({
      data,
      message: ResponseMessage.COMMENT_UPDATED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }

  @Delete(':id')
  @Role([Permission.USER])
  @Throttle(10, 60)
  async remove(
    @Param('id') id: string,
    @Query('resource') resource: string,
    @Query('resource_type') resource_type: ResourceType,
    @Req() req: Request,
  ) {
    const data = await this.commentService.remove(
      toMongooseObjectId(id),
      toMongooseObjectId(req['user']['userId']),
    );


    return new Response({
      data,
      message: ResponseMessage.COMMENT_DELETED_SUCCESSFULLY,
      status: HttpStatus.OK,
      errors: null,
    });
  }
}
