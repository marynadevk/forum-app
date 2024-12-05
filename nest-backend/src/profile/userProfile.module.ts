import { Module } from '@nestjs/common';
import { UserProfileController } from './v1/userProfile.controller.v1';
import { UserProfileService } from './v1/userProfile.service.v1';
import { UserProfileV2Service } from './v2/userProfile.service.v2';
import { UserProfileV2Controller } from './v2/userProfile.controller.v2';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [UserProfileController, UserProfileV2Controller],
  providers: [UserProfileService, UserProfileV2Service, JwtStrategy],
})
export class UserProfileModule {}
