import { CreateCommentDto } from '../dtos/create-comment.dto';
import Comment from '../models/comment.schema';
import postService from './post.service';
import userService from './user.service';

class CommentService {
  async getCommentsWithAllData(comments: any[]) {
    return await Promise.all(
      comments.map(async (comment) => {
        const author = await userService.getUserById(comment.author);
        const subCommentsCount = await this.getCountOfSubComments(
          comment.id,
        );

        return {
          ...comment.toObject(),
          author: {
            id: author.id,
            username: author.username,
            avatar: author.avatar,
          },
          subCommentsCount,
        };
      }),
    );
  }

  async createComment(data: CreateCommentDto) {
    const author = await userService.getUserById(data.authorId);
    const newComment = new Comment({
      content: data.content,
      author,
      post: data.postId || null,
      parentComment: data.commentId || null,
    });

    if (data.postId) {
      const post = await postService.getPostById(data.postId);
      if (!post) {
        throw new Error('Post not found');
      }
      newComment.post = post._id;
    } else if (data.commentId) {
      const parentComment = await this.getCommentById(data.commentId);
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
      newComment.parentComment = parentComment._id;
    }

    await newComment.save();

    const savedComment = await Comment.findById(newComment._id)
      .populate('author', 'id username avatar')
      .populate('post', 'id title')
      .populate('parentComment', 'id content');

    return savedComment;
  }

  async getCommentById(commentId: string) {
    const comment = await Comment.findById(commentId)
      .select('id postId parentCommentId content authorId createdAt')
      .exec();
    if (!comment) {
      return null;
    }
    return comment.toObject();
  }

  async getPostComments(postId: string, limit = 5) {
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .limit(+limit!);
  
    return await this.getCommentsWithAllData(comments);
  }
  

  async getCommentTree(parentCommentId: string, limit = 10) {
    const comments = await Comment.aggregate([
      { $match: { parentCommentId } },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },
      {
        $addFields: {
          subCommentsCount: {
            $size: {
              $filter: {
                input: '$subComments',
                as: 'subComment',
                cond: { $eq: ['$$subComment.parentCommentId', '$_id'] },
              },
            },
          },
        },
      },
      { $sort: { createdAt: 1 } },
      { $limit: limit },
    ]);

    return comments;
  }

  async getCountOfSubComments(commentId: string) {
    return await Comment.countDocuments({ parentComment: commentId });
  }

  async editComment(body: any) {
    const { commentId, authorId, ...updateData } = body;
    const author = await userService.getUserById(authorId);
    if (!author) {
      throw new Error('User not found');
    }
    const existingComment = await Comment.findOne({ _id: commentId });
    if (!existingComment) {
      throw new Error('Comment not found');
    }
    if (existingComment.author !== authorId) {
      throw new Error('You are not allowed to edit this comment');
    }
    return await Comment.findByIdAndUpdate(commentId, updateData, { new: true });
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.author.toString() !== userId) {
      throw new Error('You are not allowed to delete this comment');
    }
    await comment.deleteOne();

    return comment;
  }
}

export default new CommentService();
