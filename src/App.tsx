import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  AppProvider, getNavigationHolder,
} from 'mapping-context-rn';
import {
  ModalProvider, ThemeProvider,
} from 'mapping-style-guide-rn';

import Navigation from '../lib/navigation';

const App = () => {
  const navigationHolder = getNavigationHolder();
  return (
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer ref={navigationHolder.getRef()}>
          <ModalProvider>
            <Navigation />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
