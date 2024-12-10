import { IsNumber } from 'class-validator';

export class GetPostsDto {
  @IsNumber()
  authorId?: number;
  @IsNumber()
  limit?: number;
  @IsNumber()
  page?: number;
}
