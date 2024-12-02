import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthV2Service } from './auth.service.v2';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('/v2/auth')
export class AuthV2Controller {
  constructor(private authService: AuthV2Service) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);
    return user;
  }
  @Get('/check-username')
  async checkUsernameUnique(@Query('username') username: string) {
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    const user = await this.authService.checkUsernameUnique(username);
    return { isUnique: !user };
  }
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);
    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    const user = req.user;
    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout() {
    return 'Logged out';
  }
}
