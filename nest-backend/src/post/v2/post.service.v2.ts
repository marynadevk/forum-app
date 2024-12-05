import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserService } from 'src/user/v1/user.service.v1';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';

@Injectable()
export class PostV2Service {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async getPostById(postId: string) {
    const post = await this.postRepository.findOne({ where: { id: +postId } });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    const { id } = post.author;
    const author = await this.userService.getUserById(id.toString());

    return {
      ...post,
      author,
    };
  }

  async getPostsByAuthorId({ page, limit, authorId }) {
    const offset = (page - 1) * limit;
    const author = await this.userService.getUserById(authorId);
    const posts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      where: { author },
      take: limit,
      skip: offset,
    });
    if (!posts || posts.length === 0) {
      throw new NotFoundException(`Posts from user not found`);
    }
    const totalPosts = await this.postRepository.count({ where: { author } });

    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }

  async getAllPosts({ page = 1, limit = 4 }) {
    const offset = (page - 1) * limit;
    const posts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    if (!posts) {
      throw new NotFoundException(`Posts not found`);
    }

    const totalPosts = await this.postRepository.count();

    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }

  async createPost(postData: CreatePostDto) {
    const author = await this.userService.getUserById(postData.authorId);
    const post = this.postRepository.create({ ...postData, author });

    return await this.postRepository.save(post);
  }
  async editPost(body: any) {
    const { postId, authorId, ...updateData } = body;
    const id = +postId;
    const author = await this.userService.getUserById(authorId);
    if (!author) {
      throw new NotFoundException(`User not found`);
    }

    const existingPost = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!existingPost) {
      throw new NotFoundException(`Post not found`);
    }

    Object.assign(existingPost, updateData);
    existingPost.author = author;
    return await this.postRepository.save(existingPost);
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postRepository.findOne({
      where: { id: +postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    if (post.author.id !== +userId) {
      throw new NotFoundException(`User not allowed to delete this post`);
    }
    return await this.postRepository.remove(post);
  }
}
