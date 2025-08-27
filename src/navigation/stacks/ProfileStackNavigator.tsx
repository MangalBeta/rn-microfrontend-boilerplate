import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {ProfileStackParamList} from '@types/navigation';

// Screens
import ProfileScreen from '@microfrontends/profile/screens/ProfileScreen';
import EditProfileScreen from '@microfrontends/profile/screens/EditProfileScreen';
import ChangePasswordScreen from '@microfrontends/profile/screens/ChangePasswordScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

