export class PostDto {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  image?: string;
  comments?: any[];
}
