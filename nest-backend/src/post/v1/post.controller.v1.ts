import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostService } from './post.service.v1';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditPostDto } from '../dtos/edit-post.dto';

@Controller('/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.postService.getAllPosts({ page, limit });
  }

  @Get('/author/:authorId')
  async getPostsByAuthorId(
    @Param('authorId') authorId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.postService.getPostsByAuthorId({ authorId, page, limit });
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
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
    @Param('postId') postId: string,
    @Body() body: EditPostDto,
  ) {
    const { userId } = req.user;
    body.authorId = userId;
    body.postId = postId;
    return await this.postService.editPost(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async deletePost(@Request() req, @Param('postId') postId: string) {
    const { userId } = req.user;
    return await this.postService.deletePost(postId, userId);
  }
}
