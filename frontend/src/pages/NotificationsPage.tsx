import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  countUnreadNotifications,
  getNotifications,
  markNotificationAsRead,
} from 'src/api/notifications';
import { handleError } from 'src/helpers/errorHandler';
import { INotification } from 'src/interfaces';
import useUserStore from 'src/store/authorized-user.store';
import TimeAgo from '@components/TimeAgo';
import UserLink from '@components/UserLink';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { toast } from 'react-toastify';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { user, setNotificationsCount } = useUserStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user) return;
        const data = await getNotifications();
        const count = await countUnreadNotifications();
        setNotificationsCount(count);
        setNotifications(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setNotificationsCount(await countUnreadNotifications());
      toast.success(result.message);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="p-4 space-y-4 w-full">
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <Card
            key={notification.id + notification.createdAt}
            className={
              'w-2/4 notification-item border ' +
              (notification.isRead ? 'border-gray-300' : 'border-pink-500')
            }
          >
            <CardHeader className="flex items-center flex-row justify-between">
              <CardTitle>
                <UserLink user={{ ...notification.initiator }} />{' '}
                {notification.type === 'like'
                  ? 'liked your post'
                  : 'commented on your post'}
              </CardTitle>
              <span className="text-sm text-gray-500">
                <TimeAgo date={notification.createdAt} />
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Link to={`/threads/${notification.contentId}`} className='hover:text-pink-500'>
                  See the post
                </Link>
                {!notification.isRead && (
                  <Button
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
