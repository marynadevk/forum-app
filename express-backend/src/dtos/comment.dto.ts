import { UserDto } from './user.dto';


export class CommentDto {
  id: string;
  content: string;
  authorId: string;
  author: UserDto;
  subCommentsCount: number;
  createdAt: Date;
  postId?: string;
  parentCommentId?: string;
  likes?: string[];
}
