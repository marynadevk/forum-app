import { IsString, IsNotEmpty } from 'class-validator';

export class EditPostDto {
  authorId: number;
  postId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
