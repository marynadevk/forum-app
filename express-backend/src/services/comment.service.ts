import { ObjectId } from 'mongodb';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import Comment from '../models/comment.schema';
import Notification from '../models/notification.schema';
import postService from './post.service';
import userService from './user.service';
import notificationService from './notification.service';

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
      if (post.author.toString() !== data.authorId.toString()) {
        notificationService.createNotification({
          userId: post.author,
          type: 'comment',
          contentId: post._id,
          initiator: data.authorId,
          message: `User ${data.authorId} commented on your post.`,
        });
      }

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
      {
        $match: { parentComment: new ObjectId(parentCommentId) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'parentComment',
          as: 'subComments'
        }
      },
      {
        $addFields: {
          subCommentsCount: { $size: '$subComments' }
        }
      },
      {
        $sort: { createdAt: 1 }
      },
      { $limit: limit },
      {
        $project: {
          id: '$_id',
          parentComment: 1,
          content: 1,
          createdAt: 1,
          author: {
            id: '$author._id',
            username: '$author.username',
            avatar: '$author.avatar'
          },
          subCommentsCount: 1
        }
      }
    ]);

    return comments || [];
  }

  async getCountOfSubComments(commentId: string) {
    return await Comment.countDocuments({ parentComment: commentId });
  }

  async editComment(commentId: string, body: any) {
    const { authorId, ...updateData } = body;
    const author = await userService.getUserById(authorId);
    if (!author) {
      throw new Error('User not found');
    }

    const existingComment = await Comment.findOne({ _id: commentId });
    if (!existingComment) {
      throw new Error('Comment not found');
    }

    if (existingComment.author.toString() !== authorId) {
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

  async likeComment(commentId: string, userId: string) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.author.toString() !== userId.toString()) {
      notificationService.createNotification({
        userId: comment.author,
        type: 'like',
        contentId: commentId,
        initiator: userId,
        message: `User ${userId} liked your comment.`,
      });
    }

    comment.likes.push(new ObjectId(userId));
    return await comment.save();
  }

  async unlikeComment(commentId: string, userId: string) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    comment.likes = comment.likes.filter((like) => like.toString() !== userId);
    return await comment.save();
  }
}

export default new CommentService();
