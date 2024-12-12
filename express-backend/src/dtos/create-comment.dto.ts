export class CreateCommentDto {
  content: string;
  postId?: string;
  commentId?: string;
  authorId: string;
}
