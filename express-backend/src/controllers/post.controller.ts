import { Request, Response } from 'express';
import postService from '../services/post.service';

class PostController {
  async getPostById(req: Request, res: Response) {
    const post = await postService.getPostById(req.params.postId);
    res.json(post);
  }

  async createPost(req: Request, res: Response) {
    const { id } = res.locals.user;
    req.body.authorId = id;
    const post = await postService.createPost(req.body);
    res.json(post);
  }

  async editPost(req: Request, res: Response) {
    const { postId } = req.params;
    const { id } = res.locals.user;
    req.body.authorId = id;
    const post = await postService.editPost(postId, req.body);
    res.json(post);
  }

  async deletePost(req: Request, res: Response) {
    const { id } = res.locals.user;
    const post = await postService.deletePost(req.params.postId, id);
    res.json({
      message: 'Post deleted successfully',
      post,
    });
  }

  async getAllPosts(req: Request, res: Response) {
    const posts = await postService.getPosts(req.query);
    res.json(posts);
  }

  async getPostsByAuthorId(req: Request, res: Response) {
    const { authorId } = req.params;
    const posts = await postService.getPosts({ ...req.query, authorId });
    res.json(posts);
  }
}

export default new PostController();