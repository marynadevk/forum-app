import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthV2Service {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private jwtOptions = {
    secret: this.configService.get<string>('JWT_SECRET'),
  };

  async signup(userData: CreateUserDto) {
    const checkEmail = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (checkEmail) {
      throw new Error('Email already exists');
    }

    const checkUsername = await this.userRepository.findOne({
      where: { username: userData.username },
    });
    if (checkUsername) {
      throw new Error('Username already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);

    userData.password = hashedPassword;

    const savedUser = this.userRepository.create({ ...userData });
    return await this.userRepository.save(savedUser);
  }

  async checkUsernameUnique(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user ? false : true;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, this.jwtOptions),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}
