import Post from '../models/post.schema';
import Notification from '../models/notification.schema';
import { CreatePostDto } from '../dtos/create-post.dto';
import userService from './user.service';
import { PaginatedPostsDTO } from '../dtos/paginated-posts.dto';
import commentService from './comment.service';
import { ObjectId } from 'mongodb';
import notificationService from './notification.service';


class PostService {
  async getPostById(id: string) {
    const post = await Post.findById({ _id: id }).populate('author', 'id username avatar');
    if (!post) {
      throw new Error('Post not found');
    }
    const comments = await commentService.getPostComments(id);

    return {
      ...post.toObject(),
      comments,
    };
  }

  async createPost(postData: CreatePostDto) {
    const author = await userService.getUserById(postData.authorId);
    const post = await Post.create({ ...postData, author });

    return await post.save();
  }

  async editPost(postId: string, body: any) {
    const { authorId, ...updateData } = body;
    const author = await userService.getUserById(authorId);
    if (!author) {
      throw new Error('User not found');
    }
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      throw new Error('Post not found');
    }
  
    if (existingPost.author.toString() !== authorId) {
      throw new Error('You are not allowed to edit this post');
    }
  
    return await Post.findByIdAndUpdate(postId, updateData, { new: true });
  }
  

  async deletePost(id: string, userId: string) {
    const post = await Post.findById({ _id: id });
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.author.toString() !== userId) {
      throw new Error('You are not allowed to delete this post');
    }
    await post.deleteOne();

    return post;
  }

  async getPosts({ page = 1, limit = 4, authorId }: PaginatedPostsDTO) {
    const offset = (page - 1) * limit;
    const filter: any = authorId ? { author: new ObjectId(authorId) } : {};
    let totalPosts = 0;
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    if (!posts) {
      throw new Error(`Posts not found`);
    }
    if (posts.length) {
      totalPosts = await Post.countDocuments(filter);
    }

    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }

  async likePost(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.author.toString() !== userId.toString()) {
      notificationService.createNotification({
        userId: post.author,
        type: 'like',
        contentId: postId,
        initiator: userId,
        message: `User ${userId} liked your post.`,
      });
    }

    post.likes.push(new ObjectId(userId));
    return await post.save();
  }

  async unlikePost(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    post.likes = post.likes.filter((like) => like.toString() !== userId);
    return await post.save();
  }
}

export default new PostService();
