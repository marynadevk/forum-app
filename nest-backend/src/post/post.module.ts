import { Module } from '@nestjs/common';
import { PostController } from './v1/post.controller.v1';
import { PostService } from './v1/post.service.v1';
import { UserModule } from 'src/user/user.module';
import { PostDao } from './v1/post.dao.v1';
import { PostV2Controller } from './v2/post.controller.v2';
import { PostV2Service } from './v2/post.service.v2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController, PostV2Controller],
  providers: [PostService, PostV2Service, PostDao],
  exports: [PostService, PostV2Service],
})
export class PostModule {}
