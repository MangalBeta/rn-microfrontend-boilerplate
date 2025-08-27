import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {notificationService} from '@services/NotificationService';

// Types
interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  data?: any;
  actionUrl?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  pushToken: string | null;
  permissionStatus: 'granted' | 'denied' | 'not-determined';
  settings: {
    pushEnabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    badgeEnabled: boolean;
  };
}

// Initial state
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  pushToken: null,
  permissionStatus: 'not-determined',
  settings: {
    pushEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    badgeEnabled: true,
  },
};

// Async thunks
export const requestNotificationPermission = createAsyncThunk(
  'notification/requestPermission',
  async (_, {rejectWithValue}) => {
    try {
      const permission = await notificationService.requestPermission();
      return permission;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Permission request failed');
    }
  },
);

export const registerForPushNotifications = createAsyncThunk(
  'notification/registerForPush',
  async (_, {rejectWithValue}) => {
    try {
      const token = await notificationService.getToken();
      return token;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token registration failed');
    }
  },
);

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const notifications = await notificationService.getNotifications(token);
      return notifications;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch notifications');
    }
  },
);

export const markNotificationAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      await notificationService.markAsRead(notificationId, token);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark notification as read');
    }
  },
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      await notificationService.markAllAsRead(token);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark all notifications as read');
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (notificationId: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      await notificationService.deleteNotification(notificationId, token);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete notification');
    }
  },
);

export const updateNotificationSettings = createAsyncThunk(
  'notification/updateSettings',
  async (
    settings: Partial<NotificationState['settings']>,
    {getState, rejectWithValue}
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const updatedSettings = await notificationService.updateSettings(settings, token);
      return updatedSettings;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update notification settings');
    }
  },
);

// Slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    markAsReadLocal: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsReadLocal: state => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    clearAllNotifications: state => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setPushToken: (state, action: PayloadAction<string>) => {
      state.pushToken = action.payload;
    },
    setPermissionStatus: (state, action: PayloadAction<'granted' | 'denied' | 'not-determined'>) => {
      state.permissionStatus = action.payload;
    },
    updateLocalSettings: (state, action: PayloadAction<Partial<NotificationState['settings']>>) => {
      state.settings = {...state.settings, ...action.payload};
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Request Permission
    builder
      .addCase(requestNotificationPermission.fulfilled, (state, action) => {
        state.permissionStatus = action.payload;
      })
      .addCase(requestNotificationPermission.rejected, (state, action) => {
        state.error = action.payload as string;
        state.permissionStatus = 'denied';
      });

    // Register for Push
    builder
      .addCase(registerForPushNotifications.fulfilled, (state, action) => {
        state.pushToken = action.payload;
      })
      .addCase(registerForPushNotifications.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Fetch Notifications
    builder
      .addCase(fetchNotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Mark as Read
    builder
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount -= 1;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Mark All as Read
    builder
      .addCase(markAllNotificationsAsRead.fulfilled, state => {
        state.notifications.forEach(notification => {
          notification.read = true;
        });
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Delete Notification
    builder
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.read) {
          state.unreadCount -= 1;
        }
        state.notifications = state.notifications.filter(n => n.id !== action.payload);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Update Settings
    builder
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.settings = {...state.settings, ...action.payload};
      })
      .addCase(updateNotificationSettings.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  addNotification,
  removeNotification,
  markAsReadLocal,
  markAllAsReadLocal,
  clearAllNotifications,
  setPushToken,
  setPermissionStatus,
  updateLocalSettings,
  clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer;

