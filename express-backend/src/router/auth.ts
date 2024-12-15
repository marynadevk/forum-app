import { authMiddleware } from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';
import * as express from 'express';


const authRouter = express.Router();

authRouter.post('/v1/auth/signup', AuthController.signup);
authRouter.post('/v1/auth/login', AuthController.login);
authRouter.get('/v1/auth/check-username', AuthController.checkUsernameUnique);
authRouter.get('/v1/auth/me', authMiddleware, AuthController.getMe);

export default authRouter;