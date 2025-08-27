import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {SettingsStackParamList} from '@types/navigation';

// Screens
import SettingsScreen from '@microfrontends/settings/screens/SettingsScreen';
import LanguageScreen from '@microfrontends/settings/screens/LanguageScreen';
import ThemeScreen from '@microfrontends/settings/screens/ThemeScreen';
import AboutScreen from '@microfrontends/settings/screens/AboutScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
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
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          title: 'Language',
        }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{
          title: 'Theme',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;

