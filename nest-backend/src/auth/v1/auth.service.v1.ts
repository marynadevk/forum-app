import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthDao } from './auth.dao.v1';
import * as bcrypt from 'bcryptjs';
import { TokenService } from '../token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDao: AuthDao,
    private readonly tokenService: TokenService,
  ) {}

  async signup(userData: CreateUserDto) {
    const { password, email, avatar, username } = userData;
    const user = await this.authDao.findUserByEmail(email);
    if (user) {
      throw new ConflictException(
        'User with provided email or username already exists',
      );
    }
    const usernameExists = await this.authDao.findUserByUsername(username);
    if (usernameExists) {
      throw new ConflictException('Username already exists');
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

    return this.tokenService.generateToken(savedUser);
  }

  async checkUsernameUnique(username: string) {
    const user = await this.authDao.findUserByUsername(username);
    return user ? false : true;
  }

  async login(email: string, password: string) {
    const user = await this.authDao.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.tokenService.generateToken(user);
  }

  async findUserById(userId: string) {
    return await this.authDao.findUserById(userId);
  }
}
