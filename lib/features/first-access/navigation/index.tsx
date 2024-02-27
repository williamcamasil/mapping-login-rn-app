import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { FirstAccessProvider } from '../providers/FirstAccessProvider';
import InitialScreen from '../screens/InitialScreen';

import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <FirstAccessProvider>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName={'InitialScreen'}>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
      </Stack.Navigator>
    </FirstAccessProvider>
  );
};

export default Navigation;
