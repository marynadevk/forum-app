import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { TokenService } from '../token.service';

@Injectable()
export class AuthV2Service {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

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

    const user = this.userRepository.create({ ...userData });
    const savedUser = await this.userRepository.save(user);

    return this.tokenService.generateToken(savedUser);
  }

  async checkUsernameUnique(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return !!user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.tokenService.generateToken(user);
  }
}
