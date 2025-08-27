import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {NotificationStackParamList} from '@types/navigation';

// Screens
import NotificationListScreen from '@microfrontends/notifications/screens/NotificationListScreen';
import NotificationDetailScreen from '@microfrontends/notifications/screens/NotificationDetailScreen';

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationList"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
      }}>
      <Stack.Screen
        name="NotificationList"
        component={NotificationListScreen}
        options={{
          title: 'Notifications',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{
          title: 'Notification',
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigator;

