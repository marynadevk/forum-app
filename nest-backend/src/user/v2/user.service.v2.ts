import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { ChangeUserProfileDto } from '../dtos/change-user-profile.dto';
import * as bcrypt from 'bcryptjs';
import { DeleteProfileDto } from '../dtos/delete-user-profile.dto';

@Injectable()
export class UserV2Service {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsersProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: +userId } });

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
    const usernameExists = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (usernameExists) {
      throw new NotFoundException(`Username already exists`);
    }

    await this.userRepository.update(userId, body);

    const updatedUser = await this.userRepository.findOne({
      where: { id: +userId },
    });
    if (!updatedUser) {
      throw new NotFoundException(`User's profile not found`);
    }

    return updatedUser;
  }

  async deleteProfile(userId: string, @Body() body: DeleteProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: +userId } });

    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid password');
    }

    const deleteResult = await this.userRepository.delete(userId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Failed to delete user's profile`);
    }

    return {
      message: 'Profile successfully deleted',
      userId,
    };
  }
}
