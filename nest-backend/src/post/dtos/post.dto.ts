export class PostDto {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  image?: string;
}
