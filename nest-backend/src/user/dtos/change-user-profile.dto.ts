import { IsOptional, IsString } from 'class-validator';

export class ChangeUserProfileDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
