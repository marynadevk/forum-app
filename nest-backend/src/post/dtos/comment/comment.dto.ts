import { User } from 'src/database/entities/user.entity';

export class CommentDto {
  id: number;
  content: string;
  authorId: number;
  author: User;
  subCommentsCount: number;
  createdAt: Date;
  postId?: number;
  parentCommentId?: number;
  likes?: number;
}
