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
    const user = await this.authService.signup(body);
    return user;
  }
  @Get('/check-username')
  async checkUsernameUnique(username: string) {
    const user = await this.authService.checkUsernameUnique(username);
    return user;
  }
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
