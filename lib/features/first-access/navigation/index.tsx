import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { FirstAccessProvider } from '../providers/FirstAccessProvider';
import LoginScreen from '../screens/LoginScreen';

import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <FirstAccessProvider>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName={'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </FirstAccessProvider>
  );
};

export default Navigation;
