import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserV2Service {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException(`User's profile not found`);
    }
    return user;
  }

  async updateUser(id: string, body: any) {
    const usernameExists = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (usernameExists) {
      throw new NotFoundException(`Username already exists`);
    }

    await this.userRepository.update(id, body);

    const updatedUser = await this.userRepository.findOne({
      where: { id: +id },
    });
    if (!updatedUser) {
      throw new NotFoundException(`User's profile not found`);
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Failed to delete user's profile`);
    }

    return {
      message: 'Profile successfully deleted',
      id,
    };
  }
}
