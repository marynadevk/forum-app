import Post from '../models/post.schema';
import { CreatePostDto } from '../dtos/create-post.dto';
import userService from './user.service';
import { PaginatedPostsDTO } from '../dtos/paginated-posts.dto';
import commentService from './comment.service';


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

  async editPost(body: any) {
    const { postId, authorId, ...updateData } = body;
    const author = await userService.getUserById(authorId);
    if (!author) {
      throw new Error('User not found');
    }

    const existingPost = await Post.findOne({ id: postId });
    if (!existingPost) {
      throw new Error('Post not found');
    }
    if (existingPost.author !== author.id) {
      throw new Error('You are not allowed to edit this post');
    }

    return await Post.findByIdAndUpdate({ postId, ...updateData }, { new: true });
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

  async getPosts({ page = 1, limit = 4 }: PaginatedPostsDTO) {
    const offset = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    if (!posts || posts.length === 0) {
      throw new Error(`Posts not found`);
    }

    const totalPosts = await Post.countDocuments();
    return {
      data: posts,
      total: totalPosts,
      page,
      limit,
    };
  }
}

export default new PostService();
