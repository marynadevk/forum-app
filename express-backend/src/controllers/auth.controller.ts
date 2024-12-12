import AuthService from '../services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  async checkUsernameUnique(req: Request, res: Response) {
    const { username } = req.query;
    
    const exists = await AuthService.checkUsernameUnique(username as string);
    res.json({ isUnique: !exists });
  }

  async signup(req: Request, res: Response) {
    const token = await AuthService.signup(req.body);
    res.json(token);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.json(token);
  }

  async getMe(_req: Request, res: Response) {
    const user = res.locals.user;
    res.json(user);
  }
}

export default new AuthController();