import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  useDidMount,
  useDidMountAndUpdate,
  useNavigationHolder, withPropsInjection,
} from 'mapping-context-rn';
import {
  Button,
  Container,
  useTheme,
  Spacer,
  Text,
  StackedContainer,
  InputText,
  wrapForm,
  OnSubmitFormType,
  useModal,
  AlertModal,
  NavigationBar,
} from 'mapping-style-guide-rn';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSocialMedia: {
    textAlign: 'center'
  },
  imageSocialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

type FormValues = {
  user: string;
  password: string;
};

const CreateAccountScreen = wrapForm<{}, FormValues>(
  ({
    handleSubmit,
    values,
    submitting,
    form,
  }) => {
    const theme = useTheme();
    const showModal = useModal();
    const navigation = useNavigationHolder();
    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);

    useDidMountAndUpdate(() => {
      if (!values.user || !values.password) {
        setIsButtonEnabled(true);
        return;
      }
      setIsButtonEnabled(false);
    }, [values]);

    useDidMount(() => {
      form.reset()
    });

    const handleResetForm = useCallback(() => {
      form.reset();
    }, []);

    const handleNavigateToLogin = useCallback(() => {
      navigation.replace('LoginScreen');
    }, []);

    const showModalMessage = useCallback((title: string, description: string, action: boolean) => {
      showModal(AlertModal, {
        testID: 'alert-modal',
        title: title,
        description: description,
        primaryButtonName: 'Ok',
        dismissible: false,
        onPressPrimary: action ? handleNavigateToLogin : handleResetForm,
      });
    }, [showModal]);

    const handleFormSubmit: OnSubmitFormType<FormValues> = useCallback(
      async values => {
        const { user, password } = values;

        auth().createUserWithEmailAndPassword(user, password).then(() => {
          showModalMessage('Conta criada com sucesso!', 'Agora você pode fazer login com seu usuário e senha cadastrados.', true);
        }).catch(() => {
          showModalMessage('Ocorreu um erro', 'Login ou senha inválidos, tente novamente.', false);
        });
      },
      [navigation],
    );

    const handleFormatValue = useCallback((value: string | undefined) => {
      if (!value) return '';
      return value.replace(/\D/g, '');
    }, []);

    const renderCreatePassword = () => (
      <Container>
        <Spacer size={theme.spacings.sLarge} />
        <Text variant="headingSmall" color="neutralGray700">
          Registre sua conta
        </Text>
        <Spacer size={theme.spacings.sXXL} />
        <InputText.Field
          testID="input-user"
          label="Usuário"
          name="user"
          required
          autoCapitalize="none"
          disabled={submitting}
        />
        <Spacer size={theme.spacings.sLarge} />
        <InputText.Field
          testID="input-password"
          label="Senha"
          name="password"
          format={handleFormatValue}
          parse={handleFormatValue}
          maxLength={6}
          keyboardType="numeric"
          secureTextEntry
          required
          disabled={submitting}
        />
      </Container>
    );

    return (
      <StackedContainer
        headerContent={<NavigationBar />}
        topContent={renderCreatePassword()}
        bottomContent={(
          <Button
            size="large"
            variant="containedPrimary"
            disabled={isButtonEnabled}
            onPress={handleSubmit(handleFormSubmit)}
          >
            Registrar
          </Button>
        )}
      />
    );
  },
);

export default withPropsInjection(CreateAccountScreen, {});
