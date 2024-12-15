import * as express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import NotificationController from '../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.get('/v1/notification', authMiddleware, NotificationController.getNotifications);
notificationRouter.get('/v1/notification/unread', authMiddleware, NotificationController.getUnreadCount);
notificationRouter.post('/v1/notification/mark-as-read/:id', NotificationController.markAsRead);
notificationRouter.delete('/v1/notification/:id', NotificationController.deleteNotification);


export default notificationRouter;
