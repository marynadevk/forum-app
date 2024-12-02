import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from './user.dao.v1';
import { ChangeUserProfileDto } from '../dtos/change-user-profile.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}
  async getUsersProfile(userId: string) {
    const user = await this.userDao.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }

    //TODO: Implement the logic to get the user's posts and impressions
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      posts: 0,
      impressions: 0,
    };
  }

  async updateProfile(userId: string, body: ChangeUserProfileDto) {
    const usernameExists = await this.userDao.findUserByUsername(body.username);
    if (usernameExists) {
      throw new NotFoundException(`Username already exists`);
    }
    const user = await this.userDao.changeUserData({ id: userId, ...body });
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      posts: 0,
      impressions: 0,
    };
  }

  async deleteProfile(userId: string, password: string) {
    const user = await this.userDao.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid password');
    }

    return await this.userDao.deleteUser(userId);
  }
}
