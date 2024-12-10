import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { EditUserProfileDto } from '../dtos/edit-user-profile.dto';
import * as bcrypt from 'bcryptjs';
import { DeleteProfileDto } from '../dtos/delete-user-profile.dto';
import { UserV2Service } from 'src/user/v2/user.service.v2';
import { PostService } from 'src/post/v1/post/post.service.v1';

@Injectable()
export class UserProfileV2Service {
  constructor(
    private readonly userService: UserV2Service,
    private readonly postService: PostService,
  ) { }

  async getUsersProfile(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    const { total } = await this.postService.getPostsByAuthorId({
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

  async updateProfile(userId: number, body: EditUserProfileDto) {
    const user = await this.userService.updateUser(userId, body);

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    };
  }

  async deleteProfile(userId: number, @Body() body: DeleteProfileDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }

    const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid password');
    }

    return await this.userService.deleteUser(userId);
  }
}