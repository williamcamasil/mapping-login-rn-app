import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import CreateAccountScreen from '.';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

jest.mock('@react-native-firebase/auth', () => () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.reject(new Error('Mock error'))),
}));

const renderScreen = async () => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <CreateAccountScreen />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(CreateAccountScreen));

  return result;
};

describe('CreateAccountScreen Android', () => {
  it('Should show alert error modal, click on "Ok" and close modal', async () => {
    const screen = await renderScreen();
    fireEvent.changeText(await screen.findByTestId('input-user'), 'mapping.teste');
    fireEvent.changeText(await screen.findByTestId('input-password'), '0000');
    fireEvent.press(screen.getByText('Registrar'));
    await screen.findByText('Ocorreu um erro');
    fireEvent.press(screen.getByTestId('alert-modal-primary-button'));
    await waitForElementToBeRemoved(() => screen.queryByText('Ocorreu um erro'));
  });
});
