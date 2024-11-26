import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthDao } from './auth.dao.v1';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDao: AuthDao,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private jwtOptions = {
    secret: this.configService.get<string>('JWT_SECRET'),
  };

  async signup(userData: CreateUserDto) {
    const { password, email, avatar, username } = userData;
    const user = await this.authDao.findUserByEmail(email);
    if (user) {
      throw new Error('Email already exists');
    }
    const usernameExists = await this.authDao.findUserByUsername(username);
    if (usernameExists) {
      throw new Error('Username already exists');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const savedUser = await this.authDao.saveUser({
      password: hashedPassword,
      email,
      avatar,
      username,
      id: -1,
    });

    return savedUser;
  }

  async checkUsernameUnique(username: string) {
    const user = await this.authDao.findUserByUsername(username);
    return user ? false : true;
  }

  async login(email: string, password: string) {
    const user = await this.authDao.findUserByEmail(email);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, this.jwtOptions),
      user: {
        id: user.userId,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}
