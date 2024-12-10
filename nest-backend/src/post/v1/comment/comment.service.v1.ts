import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentDao } from './comment.dao.v1';
import { CreateCommentDto } from 'src/post/dtos/comment/create-comment.dto';
import { UserService } from 'src/user/v1/user.service.v1';
import { CommentDto } from 'src/post/dtos/comment/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentDao: CommentDao,
    private readonly userService: UserService,
  ) {}

  async getCommentsWithAllData(comments: CommentDto[]) {
    return await Promise.all(
      comments.map(async (comment) => {
        const author = await this.userService.getUserById(comment.authorId);
        const subCommentsCount = await this.commentDao.getCountOfSubComments(
          comment.id,
        );
        return {
          ...comment,
          author: {
            id: author.id,
            username: author.username,
            avatar: author.avatar,
          },
          subCommentsCount,
        };
      }),
    );
  }

  async getPostComments(postId: number, limit: number) {
    const comments = await this.commentDao.getPostComments(postId, limit);

    return await this.getCommentsWithAllData(comments);
  }

  async getCommentTree(rootId: number, limit: number) {
    return await this.commentDao.getCommentTree(rootId, limit);
  }

  async getCommentById(commentId: number) {
    return await this.commentDao.getCommentById(commentId);
  }

  async createComment(data: CreateCommentDto) {
    const savedComment = await this.commentDao.createComment(data);
    const author = await this.userService.getUserById(savedComment.authorId);
    return {
      ...savedComment,
      author: {
        id: author.id,
        username: author.username,
        avatar: author.avatar,
      },
    };
  }

  async editComment(commentId: number, data: any) {
    const comment = await this.commentDao.getCommentById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.authorId !== data.authorId) {
      throw new ForbiddenException('You are not the author of this comment');
    }
    return await this.commentDao.editComment(commentId, data);
  }
}
