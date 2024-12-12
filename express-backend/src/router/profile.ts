import { authMiddleware } from '../middlewares/auth.middleware';
import ProfileController from '../controllers/profile.controller';
import * as express from 'express';


const profileRouter = express.Router();

profileRouter.get('/v1/profile/:id', authMiddleware, ProfileController.getUsersProfile);
profileRouter.put('/v1/profile/:id', authMiddleware, ProfileController.updateProfile);
profileRouter.delete('/v1/profile/:id', authMiddleware, ProfileController.deleteProfile);

export default profileRouter;