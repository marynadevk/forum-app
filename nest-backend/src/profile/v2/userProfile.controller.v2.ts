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
  ParseIntPipe,
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
  async getUsersProfile(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<any> {
    if (id !== req.user.userId) {
      throw new ForbiddenException('Please login to view this profile');
    }
    return await this.userService.getUsersProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EditUserProfileDto,
    @Request() req,
  ): Promise<any> {
    if (id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this profile',
      );
    }
    return await this.userService.updateProfile(id, body);
  }

  @Delete(':id')
  async deleteProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteProfileDto,
    @Request() req,
  ): Promise<{ message: string; id: number }> {
    if (id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this profile',
      );
    }
    return await this.userService.deleteProfile(id, body);
  }
}
