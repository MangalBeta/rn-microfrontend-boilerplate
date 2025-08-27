import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

// Types
import {MainTabParamList} from '@types/navigation';

// Navigators
import HomeStackNavigator from './stacks/HomeStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import SettingsStackNavigator from './stacks/SettingsStackNavigator';
import NotificationStackNavigator from './stacks/NotificationStackNavigator';
import ShopNavigatorStack from './stacks/ShopNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            case 'Notifications':
              iconName = 'bell';
              break;
             case 'Shop':
              iconName = 'shopping-cart';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopNavigatorStack}
        options={{
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

