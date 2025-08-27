import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { fetchNotifications, markNotificationAsRead, deleteNotification, markAllNotificationsAsRead } from '@store/slices/notificationSlice';

export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, isLoading, error, notification } = useSelector((state: RootState) => state.notification);
  const { user } = useSelector((state: RootState) => state.auth);

  const getNotifications = () => {
    if (user?.token) {
      dispatch(fetchNotifications(user.token));
    }
  };

  const markAsRead = (notificationId: string) => {
    if (user?.token) {
      dispatch(markNotificationAsRead({ notificationId, token: user.token }));
    }
  };

  const removeNotification = (notificationId: string) => {
    if (user?.token) {
      dispatch(deleteNotification({ notificationId, token: user.token }));
    }
  };

  const markAllAsRead = () => {
    if (user?.token) {
      dispatch(markAllNotificationsAsRead(user.token));
    }
  };

  return {
    notifications,
    isLoading,
    error,
    currentNotification: notification,
    getNotifications,
    markAsRead,
    removeNotification,
    markAllAsRead,
  };
};

export default useNotifications;

