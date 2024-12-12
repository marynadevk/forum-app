import authService from './auth.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import User from '../models/user.schema';

class UserService {
  async getUserById(id: string) {
    const user = await User.findById({ _id: id  });
    if (!user) {
      throw new Error(`User's profile not found`);
    }
    return user;
  }

  async updateUser(id: string, body: UpdateUserDto) {
    if (body.username) {
      const usernameExists = await authService.checkUsernameUnique(body.username);
      if (usernameExists) {
        throw new Error(`Username already exists`);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    if (!updatedUser) {
      throw new Error(`User's profile not found`);
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    
    const deleteResult = await User.findByIdAndDelete(id);
    if (!deleteResult) {
      throw new Error(`Failed to delete user's profile`);
    }

    return {
      message: 'Profile successfully deleted',
      id,
    };
  }
}

export default new UserService();