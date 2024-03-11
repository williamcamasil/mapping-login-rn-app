import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  useAppContext,
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
  Link,
} from 'mapping-style-guide-rn';
import { Images } from '../../../../assets';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CLI_ID_GOOGLE } from '../../../../api/authenticationService';

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

const LoginScreen = wrapForm<{}, FormValues>(
  ({
    handleSubmit,
    values,
    submitting,
    form,
  }) => {
    const theme = useTheme();
    const { _setLoggedUser } = useAppContext();
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
      // * GoogleSignin.configure({
      // *   webClientId: CLI_ID_GOOGLE,
      // * });
    });

    const resetForm = useCallback(() => {
      form.reset();
    }, []);

    const showModalError = useCallback(() => {
      showModal(AlertModal, {
        title: 'O usuário ou senha está incorreto',
        description: 'Por favor tente novamente',
        primaryButtonName: 'Entendi',
        dismissible: false,
        onPressPrimary: resetForm,
      });
    }, [resetForm, showModal]);

    const showUnavailableAccess = useCallback(() => {
      // * const idToken = await GoogleSignin.signIn();

      // * const googleCredential = auth.GoogleAuthProvider.credential(idToken.idToken);

      // * return auth().signInWithCredential(googleCredential).then(data => {
      // *   console.log('data', data);
      // *   navigation.replace('DASHBOARD');
      // * }).catch(error => {
      // *   console.log('error', error);
      // *   showModalError();
      // });

      showModal(AlertModal, {
        title: 'Serviço indisponível no momento',
        description: 'Login de acesso utilizando a conta google indisponível no momento, tente novamente mais tarde',
        primaryButtonName: 'Entendi',
        dismissible: false,
      });
    }, [resetForm, showModal]);

    const handleCreateAccount = useCallback(() => {
      navigation.navigate('CreateAccountScreen');
    }, []);

    const handleFormSubmit: OnSubmitFormType<FormValues> = useCallback(
      async values => {
        const { user, password } = values;

        _setLoggedUser(currentUser => ({
          ...currentUser,
          email: user,
          isAdminUser: false,
        }));

        return auth().signInWithEmailAndPassword(user, password).then(() => {
          navigation.replace('DASHBOARD');
        }).catch(() => {
          showModalError();
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
        <Spacer size={theme.spacings.sXXL} />
        <Text variant="headingSmall" color="neutralGray700">
          Login de acesso
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
        <Spacer size={theme.spacings.sLarge} />
        <Link onPress={handleCreateAccount}>
          Criar uma conta
        </Link>
        <Spacer size={theme.spacings.sLarge} />
        <Text style={styles.textSocialMedia}>Se preferir, faça login via rede social, a partir de uma das opções abaixo:</Text>
        <Spacer size={theme.spacings.sLarge} />
        <TouchableWithoutFeedback testID="google-access" onPress={() => {showUnavailableAccess()}}>
          <View style={styles.imageSocialMedia}>
            <Images.Google width={48} height={48} />
          </View>
        </TouchableWithoutFeedback>
      </Container>
    );

    return (
      <StackedContainer
        topContent={renderCreatePassword()}
        bottomContent={(
          <Button
            size="large"
            variant="containedPrimary"
            disabled={isButtonEnabled}
            onPress={handleSubmit(handleFormSubmit)}
          >
            Acessar
          </Button>
        )}
      />
    );
  },
);

export default withPropsInjection(LoginScreen, {});
