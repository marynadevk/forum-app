import { Module } from '@nestjs/common';
import { UserService } from './v1/user.service.v1';
import { UserDao } from './v1/user.dao.v1';
import { UserV2Service } from './v2/user.service.v2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserV2Service, UserDao],
  exports: [UserService, UserV2Service],
})
export class UserModule {}
