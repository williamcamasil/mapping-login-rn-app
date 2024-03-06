import React from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import LoginScreen from '.';

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

describe('LoginScreen', () => {
  it('Should render login screen', async () => {
    const screen = await renderScreen();
    screen.getByText('Login de acesso');
    screen.getByTestId('input-user');
    screen.getByTestId('input-password');
    screen.getByText('Se preferir, faça login via rede social, a partir de uma das opções abaixo:');
    screen.getByTestId('google-access');
    expect(screen.getByText('Acessar')).toBeDisabled();
  });

  it('Should make access and navigate to dashboard', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    fireEvent.changeText(await screen.findByTestId('input-user'), 'mapping.teste');
    fireEvent.changeText(await screen.findByTestId('input-password'), '1234');
    fireEvent.press(screen.getByText('Acessar'));
    await waitFor(() => { expect(navigationHolder.dispatch).toBeCalledWith(StackActions.replace('DASHBOARD')); });
  });

  it('Should show alert error modal, click on "Entendi" and close modal', async () => {
    const screen = await renderScreen();
    fireEvent.changeText(await screen.findByTestId('input-user'), 'mapping.teste');
    fireEvent.changeText(await screen.findByTestId('input-password'), '0000');
    fireEvent.press(screen.getByText('Acessar'));
    await screen.findByText('O usuário ou senha está incorreto');
    fireEvent.press(screen.getByTestId('alert-modal-primary-button'));
    await waitForElementToBeRemoved(() => screen.queryByText('O usuário ou senha está incorreto'));
  });

  it('Should show alert modal with unavailable access message', async () => {
    const screen = await renderScreen();
    fireEvent.press(screen.getByTestId('google-access'));
    await screen.findByText('Serviço indisponível no momento');
  });
});
