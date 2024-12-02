import { Module } from '@nestjs/common';
import { UserController } from './v1/user.controller.v1';
import { UserService } from './v1/user.service.v1';
import { UserV2Service } from './v2/user.service.v2';
import { UserV2Controller } from './v2/user.controller.v2';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserDao } from './v1/user.dao.v1';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UserV2Controller],
  providers: [UserService, UserV2Service, JwtStrategy, UserDao],
})
export class UserModule {}
