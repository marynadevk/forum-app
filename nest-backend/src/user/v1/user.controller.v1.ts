import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.v1';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeUserProfileDto } from '../dtos/change-user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile/:id')
  async getUsersProfile(@Param('id') id: string): Promise<any> {
    return await this.userService.getUsersProfile(id);
  }

  @Put('/update-profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: ChangeUserProfileDto,
  ): Promise<any> {
    return await this.userService.updateProfile(id, body);
  }

  @Delete('/delete-profile/:id')
  async deleteProfile(
    @Param('id') id: string,
    @Body() { password }: { password: string },
  ): Promise<any> {
    return await this.userService.deleteProfile(id, password);
  }
}
