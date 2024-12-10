import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  Put,
  UseGuards,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserProfileService } from './userProfile.service.v1';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditUserProfileDto } from '../dtos/edit-user-profile.dto';
import { DeleteProfileDto } from '../dtos/delete-user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('/v1/profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get(':id')
  async getUsersProfile(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userProfileService.getUsersProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() body: EditUserProfileDto,
    @Request() req,
  ): Promise<any> {
    if (id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this profile',
      );
    }
    return await this.userProfileService.updateProfile(id, body);
  }

  @Delete(':id')
  async deleteProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteProfileDto,
    @Request() req,
  ): Promise<any> {
    if (id !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this profile',
      );
    }
    return await this.userProfileService.deleteProfile(id, body);
  }
}
