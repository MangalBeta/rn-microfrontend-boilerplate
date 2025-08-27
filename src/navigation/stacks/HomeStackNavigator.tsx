import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {HomeStackParamList} from '@types/navigation';

// Screens
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

