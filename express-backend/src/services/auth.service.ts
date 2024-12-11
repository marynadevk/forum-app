
import * as bcrypt from 'bcryptjs';
import tokenService from './token.service';

import { UserDto } from '../dtos/user.dto';
import User from '../models/user.schema';


class AuthService {
  async checkUsernameUnique(username: string) {
    const user = await User.findOne({ username });
    return !!user;
  }

  async signup(body: UserDto) {
    const { password, email, username } = body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw new Error('User with provided email already exists');
    }

    const usernameExists = await this.checkUsernameUnique(username);
    if (usernameExists) {
      throw new Error('Username already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const savedUser = await User.create({ ...body, password: hashedPassword });
    const plainUser = savedUser.toObject();

    return await tokenService.generateToken({ id: plainUser._id.toString(), email: plainUser.email, username: plainUser.username });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User with provided email not found');
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }
    const plainUser = user.toObject();

    return await tokenService.generateToken(
      { id: plainUser._id.toString(), email: plainUser.email, username: plainUser.username },
    );
  }
}

export default new AuthService();