import { Request, Response } from 'express';
import profileService from '../services/profile.service';

class ProfileController {
  async getUsersProfile(req: Request, res: Response) {
    const { id } = res.locals.user;
    if (id !== req.params.id) {
      throw new Error('Please login to view this profile');
    }
    const profile = await profileService.getUsersProfile(id);
    res.json(profile);
  }

  async updateProfile(req: Request, res: Response) {
    const { id } = res.locals.user;
    if (id !== req.params.id) {
      throw new Error(
        'You are not allowed to update this profile',
      );
    }
    const profile = profileService.updateProfile(id, req.body);
    res.json(profile);
  }

  async deleteProfile(req: Request, res: Response) {
    const { id } = res.locals.user;
    if (id !== req.params.id) {
      throw new Error(
        'You are not allowed to delete this profile',
      );
    }
    const profile = profileService.deleteProfile(id, req.body.password);
    res.json({
      message: 'Profile deleted successfully',
      profile,
    });
  }
};

export default new ProfileController();