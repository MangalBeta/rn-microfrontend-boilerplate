import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {AuthStackParamList} from '@types/navigation';

// Screens
import LoginScreen from '@microfrontends/auth/screens/LoginScreen';
import SignupScreen from '@microfrontends/auth/screens/SignupScreen';
import ForgotPasswordScreen from '@microfrontends/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '@microfrontends/auth/screens/ResetPasswordScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

