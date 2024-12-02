import {
  Controller,
  Put,
  UseGuards,
  Param,
  Body,
  Delete,
  Get,
} from '@nestjs/common';

import { UserV2Service } from './user.service.v2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeUserProfileDto } from '../dtos/change-user-profile.dto';
import { DeleteProfileDto } from '../dtos/delete-user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('/v2/user')
export class UserV2Controller {
  constructor(private userService: UserV2Service) { }
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
    @Body() body: DeleteProfileDto,
  ): Promise<{ message: string; userId: string }> {
    return await this.userService.deleteProfile(id, body);
  }
}
