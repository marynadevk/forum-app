import { IsString, IsNotEmpty } from 'class-validator';

export class EditPostDto {
  authorId: string;
  postId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
