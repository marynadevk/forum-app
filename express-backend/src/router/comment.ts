import CommentController from '../controllers/comment.controller';
import * as express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

const commentRouter = express.Router();

commentRouter.get('/v1/comment/tree', CommentController.getCommentTree);
commentRouter.post('/v1/comment', authMiddleware, CommentController.createComment);
commentRouter.put('/v1/comment/:commentId', authMiddleware, CommentController.editComment);
commentRouter.delete('/v1/comment/:commentId', authMiddleware, CommentController.deleteComment);

export default commentRouter;
