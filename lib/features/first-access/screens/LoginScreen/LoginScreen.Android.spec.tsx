import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import LoginScreen from '.';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

jest.mock('@react-native-firebase/auth', () => () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.reject(new Error('Mock error'))),
}));


const renderScreen = async () => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <LoginScreen />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(LoginScreen));

  return result;
};

describe('LoginScreen Android', () => {
  it('Should navigate to create account', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    fireEvent.press(screen.getByText('Criar uma conta'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('CreateAccountScreen');
  });

  it('Should show alert error modal, click on "Entendi" and close modal', async () => {
    const screen = await renderScreen();
    fireEvent.changeText(await screen.findByTestId('input-user'), 'mapping.teste');
    fireEvent.changeText(await screen.findByTestId('input-password'), '123');
    fireEvent.press(screen.getByText('Acessar'));
    await screen.findByText('O usuário ou senha está incorreto');
    fireEvent.press(screen.getByTestId('alert-modal-primary-button'));
    await waitForElementToBeRemoved(() => screen.queryByText('O usuário ou senha está incorreto'));
  });
});
