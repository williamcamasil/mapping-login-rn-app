import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Navigation as FirstAccessNavigation } from '../features/first-access';
import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={'FirstAccessNavigation'}
    >
      <Stack.Screen name="FirstAccessNavigation" component={FirstAccessNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
