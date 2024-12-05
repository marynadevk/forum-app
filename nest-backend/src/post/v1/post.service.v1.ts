import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostDao } from './post.dao.v1';
import { UserService } from 'src/user/v1/user.service.v1';
import { EditPostDto } from '../dtos/edit-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postDao: PostDao,
    private readonly userService: UserService,
  ) {}

  async getPostById(postId: string) {
    const post = await this.postDao.getPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    const authorId = post.authorId;
    const author = await this.userService.getUserById(authorId);

    return {
      ...post,
      author,
    };
  }

  async getPostsByAuthorId({ page, limit, authorId }: GetPostsDto) {
    const offset = (page - 1) * limit;
    const posts = await this.postDao.getPostsByAuthorId(
      authorId,
      limit,
      offset,
    );
    if (!posts) {
      throw new NotFoundException(`Posts from user not found`);
    }
    const totalPosts = await this.postDao.countPostsByAuthorId(authorId);

    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }

  async getAllPosts({ page = 1, limit = 4 }: GetPostsDto) {
    const offset = (page - 1) * limit;
    const posts = await this.postDao.getAllPosts(limit, offset);

    if (!posts) {
      throw new NotFoundException(`Posts not found`);
    }
    const totalPosts = await this.postDao.countAllPosts();
    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }

  async createPost(postData: CreatePostDto) {
    const { title, content, authorId, image } = postData;
    const author = await this.userService.getUserById(authorId);

    return await this.postDao.savePost({
      title,
      content,
      author,
      image,
      id: -1,
      createdAt: new Date(),
      likes: [],
      comments: [],
    });
  }

  async editPost(body: EditPostDto) {
    const { postId, title, content, authorId } = body;
    const author = await this.userService.getUserById(authorId);
    if (!author) {
      throw new NotFoundException(`User not found`);
    }

    const existingPost = await this.getPostById(postId);
    if (!existingPost) {
      throw new NotFoundException(`Post not found`);
    }

    return await this.postDao.editPost({
      title,
      content,
      authorId,
      id: postId,
      createdAt: existingPost.createdAt,
      image: existingPost.image,
    });
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    if (post.authorId !== userId) {
      throw new NotFoundException(`User not allowed to delete this post`);
    }
    return await this.postDao.deletePost(postId);
  }
}
