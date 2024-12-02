import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.v1';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @Get('/check-username')
  async checkUsernameUnique(username: string) {
    return await this.authService.checkUsernameUnique(username);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return await this.authService.login(email, password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    const { userId } = req.user;
    const user = await this.authService.findUserById(userId);
    return {
      id: userId,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
