import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserDao {
  constructor(private readonly entityManager: EntityManager) {}

  async findUserById(userId: number): Promise<User> {
    const query = `SELECT * FROM public.user WHERE id = $1`;
    const result = await this.entityManager.query(query, [userId]);

    return result.length > 0 ? result[0] : null;
  }

  async findUserByUsername(username: string): Promise<User> {
    const query = `SELECT * FROM public.user WHERE username = $1`;
    const result = await this.entityManager.query(query, [username]);
    return result.length > 0 ? result[0] : null;
  }

  async changeUserData({ username, avatar, id }): Promise<User> {
    const query = `UPDATE public.user SET username = $1, avatar = $2 WHERE id = $3 RETURNING *`;
    const result = await this.entityManager.query(query, [
      username,
      avatar,
      id,
    ]);
    return result.length > 0 ? result[0][0] : null;
  }

  async deleteUser(userId: number): Promise<any[]> {
    const query = `DELETE FROM public.user WHERE id = $1 RETURNING *`;
    const result = await this.entityManager.query(query, [userId]);
    return result.length > 0 ? result[0] : null;
  }
}
