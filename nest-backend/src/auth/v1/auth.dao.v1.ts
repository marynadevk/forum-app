import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthDao {
  constructor(private readonly entityManager: EntityManager) {}

  async findUserByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM public.user WHERE email = $1`;
    const result = await this.entityManager.query(query, [email]);
    console.log(email, 'RESULT');
    return result.length > 0 ? result[0] : null;
  }

  async findUserByUsername(username: string) {
    const query = `SELECT * FROM public.user WHERE username = $1`;
    const result = await this.entityManager.query(query, [username]);

    return result.length > 0 ? result[0] : null;
  }

  async saveUser(userData: User) {
    const { password, email, avatar, username } = userData;
    const query = `INSERT INTO public.user (password, email, avatar, username) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await this.entityManager.query(query, [
      password,
      email,
      avatar,
      username,
    ]);

    return result[0];
  }
}
