import api from './client';

export const getNotifications = async () => {
  const response = await api.get(`/notification`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const response = await api.post(`/notification/mark-as-read/${notificationId}`);
  return response.data;
};

export const deleteNotification = async (notificationId: string) => {
  const response = await api.delete(`/notification/${notificationId}`);
  return response.data;
};

export const countUnreadNotifications = async () => {
  const response = await api.get(`/notification/unread`);
  return response.data;
}
