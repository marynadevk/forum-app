import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  async logout() {
    return 'Logged out';
  }
}
