import { IsNotEmpty, IsString } from 'class-validator';

export class EditCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  authorId: number;
}
