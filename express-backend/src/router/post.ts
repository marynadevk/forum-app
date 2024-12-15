import { authMiddleware } from '../middlewares/auth.middleware';
import PostController from '../controllers/post.controller';
import * as express from 'express';

const postRouter = express.Router();

postRouter.get('/v1/post', PostController.getAllPosts);
postRouter.post('/v1/post', authMiddleware, PostController.createPost);
postRouter.put('/v1/post/:postId',authMiddleware, PostController.editPost);
postRouter.delete('/v1/post/:postId', authMiddleware, PostController.deletePost);
postRouter.get('/v1/post/author/:authorId', PostController.getPostsByAuthorId);
postRouter.get('/v1/post/:postId', PostController.getPostById);
postRouter.put('/v1/post/:postId/like', authMiddleware, PostController.likePost);
postRouter.put('/v1/post/:postId/unlike', authMiddleware, PostController.unlikePost);

export default postRouter;
