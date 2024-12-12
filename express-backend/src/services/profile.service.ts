import { UpdateUserDto } from '../dtos/update-user.dto';
import postService from './post.service';
import userService from './user.service';
import * as bcrypt from 'bcryptjs';

class ProfileService {
  async getUsersProfile(userId: string) {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error(`User's profile not found`);
    }

    const { total } = await postService.getPosts({
      authorId: userId,
      limit: 0,
      page: 0,
    });
    //TODO: Implement the logic to get the user's impressions
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      posts: total,
      impressions: 0,
    };
  }

  async updateProfile(userId: string, body: UpdateUserDto) {
    const user = await userService.updateUser(userId, body);

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    };
  }

  async deleteProfile(userId: string, password: string) {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error(`User's profile not found`);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    return await userService.deleteUser(userId);
  }
}

export default new ProfileService();
