import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  postId?: number;

  @IsOptional()
  parentCommentId?: number;

  @IsNotEmpty()
  authorId: number;
}
