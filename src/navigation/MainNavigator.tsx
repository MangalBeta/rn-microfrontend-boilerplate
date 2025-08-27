import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from '@theme/ThemeProvider';

// Types
import {DrawerParamList} from '@types/navigation';

// Navigators
import TabNavigator from './TabNavigator';

// Components
import CustomDrawerContent from '@components/CustomDrawerContent';

// Screens
import HelpScreen from '@screens/HelpScreen';
import SupportScreen from '@screens/SupportScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const MainNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 280,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}

        options={{
          drawerLabel: 'Home',
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerLabel: 'Help',
          drawerIcon: ({color, size}) => (
            <Icon name="help-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{
          drawerLabel: 'Support',
          drawerIcon: ({color, size}) => (
            <Icon name="headphones" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;

