import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// Types
import {RootStackParamList} from '@types/navigation';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Screens
import SplashScreen from '@screens/SplashScreen';

// Store
import {RootState} from '@store/index';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const {isAuthenticated, isLoading} = useSelector(
    (state: RootState) => state.auth,
  );

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <>

          <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />

        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

