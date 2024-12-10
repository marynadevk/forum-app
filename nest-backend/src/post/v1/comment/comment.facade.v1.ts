import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service.v1';
import { PostService } from '../post/post.service.v1';
import { CreateCommentDto } from 'src/post/dtos/comment/create-comment.dto';

@Injectable()
export class CommentFacade {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}
  async createComment(data: CreateCommentDto) {
    const { postId, parentCommentId } = data;
    if (postId) {
      const post = await this.postService.getPostById(postId);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
    } else if (parentCommentId) {
      const parentComment =
        await this.commentService.getCommentById(parentCommentId);
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
    }
    return await this.commentService.createComment(data);
  }
}
