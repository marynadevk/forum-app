import { IsOptional, IsString } from 'class-validator';

export class EditUserProfileDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
