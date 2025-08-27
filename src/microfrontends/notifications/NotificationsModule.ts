import { MicrofrontendModule } from '@types/microfrontend';

const NotificationsModule: MicrofrontendModule = {
  name: 'notifications',
  screens: {
    Notifications: require('./screens/NotificationListScreen').default,
    NotificationDetail: require('./screens/NotificationDetailScreen').default,
  },
  // Add any module-specific components, hooks, services here
  components: {
    // Example: NotificationItem: require('./components/NotificationItem').default,
  },
  hooks: {
    // Example: useNotifications: require('./hooks/useNotifications').default,
  },
  services: {
    // Example: notificationService: require('./services/NotificationService').default,
  },
};

export default NotificationsModule;

