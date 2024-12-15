import { NotificationDto } from '../dtos/notification.dto';
import Notification from '../models/notification.schema';

class NotificationService {
  async getNotifications(userId: string) {
    return await Notification.find({ userId }).sort({ createdAt: -1 }).populate('initiator', 'id username avatar');
  }

  async markAsRead(notificationId: string) {
    return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
  }

  async deleteNotification(notificationId: string) {
    return await Notification.findByIdAndDelete(notificationId);
  }

  async createNotification(data: NotificationDto) {
    const notification = new Notification(data);
    return await notification.save();
  }

  async countUnreadNotifications(userId: string) {
    return await Notification.countDocuments({ userId, isRead: false });
  }
}

export default new NotificationService();
