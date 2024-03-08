import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'LoginScreen'}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
