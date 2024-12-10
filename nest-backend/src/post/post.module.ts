import { Module } from '@nestjs/common';
import { PostController } from './v1/post/post.controller.v1';
import { PostService } from './v1/post/post.service.v1';
import { UserModule } from 'src/user/user.module';
import { PostDao } from './v1/post/post.dao.v1';
import { PostV2Controller } from './v2/post/post.controller.v2';
import { PostV2Service } from './v2/post/post.service.v2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { CommentService } from './v1/comment/comment.service.v1';
import { CommentDao } from './v1/comment/comment.dao.v1';
import { CommentController } from './v1/comment/comment.controller.v1';
import { CommentFacade } from './v1/comment/comment.facade.v1';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostController, PostV2Controller, CommentController],
  providers: [
    PostService,
    PostV2Service,
    PostDao,
    CommentService,
    CommentDao,
    CommentFacade,
  ],
  exports: [PostService, PostV2Service, CommentService, CommentDao],
})
export class PostModule {}
