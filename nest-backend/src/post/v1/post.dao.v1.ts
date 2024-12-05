import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';
import { PostDto } from '../dtos/post.dto';

@Injectable()
export class PostDao {
  constructor(private readonly entityManager: EntityManager) {}
  async savePost(postData: Post) {
    const { title, content, author, image } = postData;
    const query = `INSERT INTO public.post (title, content, "authorId", image) VALUES ($1, $2, $3, $4) RETURNING *`;
    const authorId = author.id;
    const result = await this.entityManager.query(query, [
      title,
      content,
      authorId,
      image,
    ]);
    return result[0];
  }
  async getPostById(postId: string): Promise<PostDto> {
    const query = `SELECT * FROM public.post WHERE id = $1`;
    const result = await this.entityManager.query(query, [postId]);

    return result.length > 0 ? result[0] : null;
  }

  async getPostsByAuthorId(
    authorId: string,
    limit: number,
    offset: number,
  ): Promise<Post[]> {
    const query = `
    SELECT * FROM public.post 
    WHERE "authorId" = $1
    ORDER BY "createdAt" DESC
    LIMIT $2 OFFSET $3
  `;
    return await this.entityManager.query(query, [authorId, limit, offset]);
  }

  async countPostsByAuthorId(authorId: string) {
    const query = `SELECT COUNT(*) as total FROM public.post WHERE "authorId" = $1`;
    const result = await this.entityManager.query(query, [authorId]);
    return parseInt(result[0].total, 10);
  }

  async getAllPosts(limit: number, offset: number) {
    const query = `
    SELECT * 
    FROM public.post
    ORDER BY "createdAt" DESC
    LIMIT $1 OFFSET $2
  `;
    return await this.entityManager.query(query, [limit, offset]);
  }

  async countAllPosts() {
    const query = `SELECT COUNT(*) as total FROM public.post`;
    const result = await this.entityManager.query(query);
    return parseInt(result[0].total, 10);
  }

  async editPost(postData: PostDto) {
    const { id, title, content, authorId } = postData;
    const query = `
    UPDATE public.post
    SET title = $1, content = $2, "authorId" = $3
    WHERE id = $4 RETURNING *
    `;
    const result = await this.entityManager.query(query, [
      title,
      content,
      authorId,
      id,
    ]);
    return result[0];
  }

  async deletePost(postId: string) {
    const query = `DELETE FROM public.post WHERE id = $1 RETURNING *`;
    const result = await this.entityManager.query(query, [postId]);
    return result.length > 0 ? result[0] : null;
  }
}
