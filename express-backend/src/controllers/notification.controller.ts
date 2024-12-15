import { Request, Response } from 'express';
import notificationService from '../services/notification.service';
import userService from '../services/user.service';

class NotificationController {
  async getNotifications(_req: Request, res: Response) {
    const { id } = res.locals.user;
    const notifications = await notificationService.getNotifications(id);
    res.json(notifications);
  }

  async markAsRead(req: Request, res: Response) {
    const { id } = req.params;
    await notificationService.markAsRead(id);
    res.json({ message: 'Notification marked as read' });
  }

  async deleteNotification(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await notificationService.deleteNotification(id);
      res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting notification', error });
    }
  }

  async getUnreadCount(_req: Request, res: Response) {
    const { id } = res.locals.user;
    const count = await notificationService.countUnreadNotifications(id);
    res.json(count);
  }
}

export default new NotificationController();
