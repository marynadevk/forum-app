import { Request, Response } from 'express';
import commentService from '../services/comment.service';

class CommentController {
  getCommentTree(req: Request, res: Response) {
    const { rootId, limit } = req.query;
    const comments = commentService.getCommentTree(rootId as string, +limit!);
    res.json(comments);
  }

  async createComment(req: Request, res: Response) {
    const { id } = res.locals.user;
    req.body.authorId = id;
    const comment = await commentService.createComment(req.body);
    res.json(comment);
  }

  async editComment(req: Request, res: Response) {
    const { id } = res.locals.user;
    req.body.authorId = id;
    const comment = await commentService.editComment(req.body);
    res.json(comment);
  }

  async deleteComment(req: Request, res: Response) {
    const { id } = res.locals.user;
    const comment = await commentService.deleteComment(req.params.commentId, id);
    res.json({
      message: 'Comment deleted successfully',
      comment,
    });
  }
}

export default new CommentController();