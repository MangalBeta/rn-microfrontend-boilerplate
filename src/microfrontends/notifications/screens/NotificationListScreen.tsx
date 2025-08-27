import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { fetchNotifications, markNotificationAsRead, deleteNotification, markAllNotificationsAsRead } from '@store/slices/notificationSlice';
import Icon from 'react-native-vector-icons/Feather';
import { NotificationsStackScreenProps } from '@types/navigation';

type Props = NotificationsStackScreenProps<'Notifications'>;

const NotificationListScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, isLoading, error } = useSelector((state: RootState) => state.notification);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchNotifications(user.token));
    }
  }, [dispatch, user?.token]);

  const handleMarkAsRead = (id: string) => {
    if (user?.token) {
      dispatch(markNotificationAsRead({ notificationId: id, token: user.token }));
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t('common.confirm'),
      t('notifications.actions.deleteConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          onPress: () => {
            if (user?.token) {
              dispatch(deleteNotification({ notificationId: id, token: user.token }));
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    if (user?.token) {
      dispatch(markAllNotificationsAsRead(user.token));
    }
  };

  const renderNotificationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotificationItem,
      ]}
      onPress={() => navigation.navigate('NotificationDetail', { notificationId: item.id })}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationBody} numberOfLines={2}>{item.body}</Text>
        <Text style={styles.notificationTime}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
      <View style={styles.notificationActions}>
        {!item.read && (
          <TouchableOpacity onPress={() => handleMarkAsRead(item.id)} style={styles.actionButton}>
            <Icon name="mail" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Icon name="trash-2" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: theme.spacing.md,
    },
    headerButton: {
      marginLeft: theme.spacing.md,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.surface,
    },
    headerButtonText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    notificationItem: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      alignItems: 'center',
    },
    unreadNotificationItem: {
      backgroundColor: theme.colors.primary + '10',
    },
    notificationContent: {
      flex: 1,
      marginRight: theme.spacing.md,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    notificationBody: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    notificationTime: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    notificationActions: {
      flexDirection: 'row',
    },
    actionButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.errorText}>{t('common.error')}: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton} onPress={handleMarkAllAsRead}>
          <Text style={styles.headerButtonText}>{t('notifications.markAllRead')}</Text>
        </TouchableOpacity>
      </View>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('notifications.noNotifications')}</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
        />
      )}
    </View>
  );
};

export default NotificationListScreen;

