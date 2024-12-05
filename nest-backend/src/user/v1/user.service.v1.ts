import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from './user.dao.v1';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}
  async getUserById(userId: string) {
    const user = await this.userDao.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    return user;
  }

  async updateUser(id: string, body: any) {
    const usernameExists = await this.userDao.findUserByUsername(body.username);
    if (usernameExists) {
      throw new NotFoundException(`Username already exists`);
    }
    const user = await this.userDao.changeUserData({
      id,
      ...body,
    });
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    return user;
  }

  async deleteUser(id: string) {
    const deleteResult = await this.userDao.deleteUser(id.toString());
    if (!deleteResult) {
      throw new NotFoundException(`Failed to delete user's profile`);
    } else {
      return {
        message: 'Profile successfully deleted',
        deleteResult,
      };
    }
  }
}
