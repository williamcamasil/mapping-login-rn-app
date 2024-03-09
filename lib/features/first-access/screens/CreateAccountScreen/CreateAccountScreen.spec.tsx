import React from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import CreateAccountScreen from '.';

jest.mock('@react-native-firebase/auth', () => () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
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

describe('CreateAccountScreen', () => {
  it('Should render login screen', async () => {
    const screen = await renderScreen();
    screen.getByText('Registre sua conta');
    screen.getByTestId('input-user');
    screen.getByTestId('input-password');
    expect(screen.getByText('Registrar')).toBeDisabled();
  });

  it('Should make access and navigate to dashboard', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    fireEvent.changeText(await screen.findByTestId('input-user'), 'mapping.teste');
    fireEvent.changeText(await screen.findByTestId('input-password'), '1234');
    fireEvent.press(screen.getByText('Registrar'));
    await screen.findByTestId('alert-modal');
    screen.getByText('Conta criada com sucesso!');
    fireEvent.press(screen.getByTestId('alert-modal-primary-button'));
    await waitFor(() => { expect(navigationHolder.dispatch).toBeCalledWith(StackActions.replace('LoginScreen')); });
  });
});
