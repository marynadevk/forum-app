import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentDao {
  constructor(private readonly dataSource: DataSource) {}

  async createComment(data: any) {
    const query = `
      INSERT INTO comment (content, "authorId", "parentCommentId", "postId")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await this.dataSource.query(query, [
      data.content,
      data.authorId,
      data.parentCommentId,
      data.postId,
    ]);

    return result[0];
  }

  async getCommentById(commentId: number) {
    const query = `
      SELECT 
        id,
        "postId",
        "parentCommentId",
        content,
        "authorId",
        "createdAt",
      FROM comment
      WHERE id = $1;
    `;
    const result = await this.dataSource.query(query, [commentId]);
    return result[0] || null;
  }

  async getCommentTree(parentCommentId: number, limit: number) {
    const query = `
      SELECT 
        c.id AS "id",
        c."parentCommentId",
        c.content,
        json_build_object(
          'id', u.id,
          'username', u.username,
          'avatar', u.avatar
        ) AS author,
        (SELECT COUNT(*) FROM comment WHERE "parentCommentId" = c.id) AS "subCommentsCount",
        c."createdAt"
      FROM comment c
      JOIN "user" u ON u.id = c."authorId"
      WHERE c."parentCommentId" = $1
      ORDER BY c."createdAt" ASC
      LIMIT $2;
    `;
    return await this.dataSource.query(query, [parentCommentId, limit]);
  }

  async getCountOfSubComments(commentId: number) {
    const query = `
    SELECT COUNT(*)
    FROM comment
    WHERE "parentCommentId" = $1;
  `;
    const result = await this.dataSource.query(query, [commentId]);
    return parseInt(result[0].count);
  }

  async getPostComments(parentId: number, limit: number) {
    const query = `
      SELECT *
      FROM comment
      WHERE "postId" = $1
      ORDER BY "createdAt" DESC
      LIMIT $2;
    `;
    return await this.dataSource.query(query, [parentId, limit]);
  }

  async editComment(commentId: number, data: any) {
    const query = `
      UPDATE comment
      SET content = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await this.dataSource.query(query, [
      data.content,
      commentId,
    ]);

    return result[0];
  }
}
