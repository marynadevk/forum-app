import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from '../../dtos/comment/create-comment.dto';
import { CommentService } from './comment.service.v1';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentFacade } from './comment.facade.v1';
import { EditCommentDto } from 'src/post/dtos/comment/edit-comment.dto';

@Controller('/v1/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentFacade: CommentFacade,
  ) {}

  @Get()
  async getPostComments(@Query('postId', ParseIntPipe) postId: number) {
    return await this.commentService.getPostComments(postId, 4);
  }

  @Get('tree')
  async getCommentTree(
    @Query('rootId', ParseIntPipe) rootId: number,
    @Query('limit', ParseIntPipe) limit: number = 4,
  ) {
    return await this.commentService.getCommentTree(rootId, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body: CreateCommentDto, @Request() req) {
    body.authorId = req.user.userId;
    return await this.commentFacade.createComment(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async editComment(
    @Request() req,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: EditCommentDto,
  ) {
    const { userId } = req.user;
    body.authorId = userId;
    return await this.commentService.editComment(commentId, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteComment() {}
}
