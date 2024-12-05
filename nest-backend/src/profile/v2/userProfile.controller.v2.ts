import {
  Controller,
  Put,
  UseGuards,
  Param,
  Body,
  Delete,
  Request,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { UserProfileV2Service } from './userProfile.service.v2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditUserProfileDto } from '../dtos/edit-user-profile.dto';
import { DeleteProfileDto } from '../dtos/delete-user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('/v2/profile')
export class UserProfileV2Controller {
  constructor(private userService: UserProfileV2Service) {}
  @Get(':id')
  async getUsersProfile(@Param('id') id: string, @Request() req): Promise<any> {
    if (+id !== req.user.userId) {
      throw new ForbiddenException('Please login to view this profile');
    }
    return await this.userService.getUsersProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: EditUserProfileDto,
    @Request() req,
  ): Promise<any> {
    if (+id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this profile',
      );
    }
    return await this.userService.updateProfile(id, body);
  }

  @Delete(':id')
  async deleteProfile(
    @Param('id') id: string,
    @Body() body: DeleteProfileDto,
    @Request() req,
  ): Promise<{ message: string; id: string }> {
    if (+id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this profile',
      );
    }
    return await this.userService.deleteProfile(id, body);
  }
}
