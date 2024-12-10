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
import { CreatePostDto } from '../../dtos/post/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditPostDto } from '../../dtos/post/edit-post.dto';
import { PostV2Service } from './post.service.v2';

@Controller('/v2/post')
export class PostV2Controller {
  constructor(private readonly postService: PostV2Service) {}

  @Get()
  async getAllPosts(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.postService.getAllPosts({ page, limit });
  }

  @Get('/author/:authorId')
  async getPostsByAuthorId(
    @Param('authorId', ParseIntPipe) authorId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.postService.getPostsByAuthorId({ authorId, page, limit });
  }

  @Get(':postId')
  async getPostById(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() body: CreatePostDto) {
    const { userId } = req.user;
    body.authorId = userId;
    return await this.postService.createPost(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId')
  async editPost(
    @Request() req,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: EditPostDto,
  ) {
    const { userId } = req.user;
    body.authorId = userId;
    body.postId = postId;
    return await this.postService.editPost(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async deletePost(
    @Request() req,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    const { userId } = req.user;
    return await this.postService.deletePost(postId, userId);
  }
}
