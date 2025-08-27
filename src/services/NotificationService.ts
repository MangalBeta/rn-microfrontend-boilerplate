import PushNotification from 'react-native-push-notification';
import {Platform, PermissionsAndroid} from 'react-native';
import {apiClient} from './ApiClient';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error';
  data?: any;
}

class NotificationService {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Configure push notifications
    PushNotification.configure({
      onRegister: (token) => {
        console.log('Push notification token:', token);
        this.sendTokenToServer(token.token);
      },
      onNotification: (notification) => {
        console.log('Notification received:', notification);
        this.handleNotification(notification);
      },
      onAction: (notification) => {
        console.log('Notification action:', notification);
      },
      onRegistrationError: (error) => {
        console.error('Push notification registration error:', error);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel',
          channelName: 'Default Channel',
          channelDescription: 'Default notification channel',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }

    this.isInitialized = true;
  }

  async requestPermission(): Promise<'granted' | 'denied' | 'not-determined'> {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied';
      }
      return 'granted'; // Android < 33 doesn't need explicit permission
    } else {
      // iOS
      return new Promise((resolve) => {
        PushNotification.requestPermissions((permissions) => {
          if (permissions.alert || permissions.badge || permissions.sound) {
            resolve('granted');
          } else {
            resolve('denied');
          }
        });
      });
    }
  }

  async getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      PushNotification.configure({
        onRegister: (token) => {
          resolve(token.token);
        },
        onRegistrationError: (error) => {
          reject(error);
        },
      });
    });
  }

  private async sendTokenToServer(token: string): Promise<void> {
    try {
      await apiClient.post('/notifications/register-token', {
        token,
        platform: Platform.OS,
      });
    } catch (error) {
      console.error('Failed to send token to server:', error);
    }
  }

  private handleNotification(notification: any): void {
    // Handle notification tap
    if (notification.userInteraction) {
      // User tapped the notification
      this.handleNotificationTap(notification);
    }
  }

  private handleNotificationTap(notification: any): void {
    // Navigate to appropriate screen based on notification data
    const {data} = notification;
    
    if (data?.screen) {
      // Navigate to specific screen
      // This would typically use navigation service
      console.log('Navigate to screen:', data.screen);
    }
  }

  showLocalNotification(data: NotificationData): void {
    PushNotification.localNotification({
      id: data.id,
      title: data.title,
      message: data.body,
      playSound: true,
      soundName: 'default',
      userInfo: data.data,
      channelId: 'default-channel',
    });
  }

  scheduleLocalNotification(data: NotificationData, date: Date): void {
    PushNotification.localNotificationSchedule({
      id: data.id,
      title: data.title,
      message: data.body,
      date,
      playSound: true,
      soundName: 'default',
      userInfo: data.data,
      channelId: 'default-channel',
    });
  }

  cancelLocalNotification(id: string): void {
    PushNotification.cancelLocalNotifications({id});
  }

  cancelAllLocalNotifications(): void {
    PushNotification.cancelAllLocalNotifications();
  }

  setBadgeNumber(number: number): void {
    PushNotification.setApplicationIconBadgeNumber(number);
  }

  getBadgeNumber(): Promise<number> {
    return new Promise((resolve) => {
      PushNotification.getApplicationIconBadgeNumber((badgeCount) => {
        resolve(badgeCount);
      });
    });
  }

  // API methods for server notifications
  async getNotifications(token: string): Promise<NotificationData[]> {
    const response = await apiClient.get('/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch notifications');
    }

    return response.data;
  }

  async markAsRead(notificationId: string, token: string): Promise<void> {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to mark notification as read');
    }
  }

  async markAllAsRead(token: string): Promise<void> {
    const response = await apiClient.patch(
      '/notifications/read-all',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.success) {
      throw new Error(response.message || 'Failed to mark all notifications as read');
    }
  }

  async deleteNotification(notificationId: string, token: string): Promise<void> {
    const response = await apiClient.delete(`/notifications/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete notification');
    }
  }

  async updateSettings(settings: any, token: string): Promise<any> {
    const response = await apiClient.patch('/notifications/settings', settings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to update notification settings');
    }

    return response.data;
  }
}

export const notificationService = new NotificationService();

// Setup function to be called in App.tsx
export const setupNotifications = async (): Promise<void> => {
  try {
    await notificationService.initialize();
    const permission = await notificationService.requestPermission();
    console.log('Notification permission:', permission);
  } catch (error) {
    console.error('Failed to setup notifications:', error);
  }
};

export default notificationService;

