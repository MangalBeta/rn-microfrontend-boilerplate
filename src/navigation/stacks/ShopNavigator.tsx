import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Types
import {ShopStackParamList} from '@types/navigation';

// Screens
import ShopScreen from '@microfrontends/shop/screens/ShopList';

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShopScreen"
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
        name="ShopScreen"
        component={ShopScreen}
        options={{
          title: 'Shop',
          headerLeft: () => null,
        }}
      />
      
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;

