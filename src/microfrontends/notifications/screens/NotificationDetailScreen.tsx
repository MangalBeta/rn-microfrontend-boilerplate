import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { fetchNotificationById, markNotificationAsRead } from '@store/slices/notificationSlice';
import { NotificationsStackScreenProps } from '@types/navigation';

type Props = NotificationsStackScreenProps<'NotificationDetail'>;

const NotificationDetailScreen: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { notification, isLoading, error } = useSelector((state: RootState) => state.notification);
  const { user } = useSelector((state: RootState) => state.auth);

  const { notificationId } = route.params;

  useEffect(() => {
    if (user?.token && notificationId) {
      dispatch(fetchNotificationById({ notificationId, token: user.token }));
    }
  }, [dispatch, notificationId, user?.token]);

  useEffect(() => {
    if (notification && !notification.read && user?.token) {
      dispatch(markNotificationAsRead({ notificationId: notification.id, token: user.token }));
    }
  }, [notification, dispatch, user?.token]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    timestamp: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      lineHeight: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    errorText: {
      fontSize: 16,
      color: theme.colors.error,
      textAlign: 'center',
      padding: theme.spacing.lg,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{t('common.error')}: {error}</Text>
      </View>
    );
  }

  if (!notification) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('notifications.noNotifications')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.timestamp}>{new Date(notification.createdAt).toLocaleString()}</Text>
      <Text style={styles.body}>{notification.body}</Text>
      {/* Render additional notification data if available */}
    </ScrollView>
  );
};

export default NotificationDetailScreen;

