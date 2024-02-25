import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import {
  useNavigationHolder,
  useDidMount,
} from 'mapping-context-rn';
import {
  Button,
  Container, Spacer, Text, useTheme, useViewStyles,
} from 'mapping-style-guide-rn';

const styles = StyleSheet.create({
  message: { textAlign: 'center' },
  valueContainer: { width: '50%' },
  scrollView: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

const App = () => {
  const navigationHolder = useNavigationHolder();
  const theme = useTheme();

  const handleAccountData = async () => {
    console.log('TESTE');
  };

  useDidMount(() => {
    handleAccountData();
  });

  const handleGoToMyAccount = useCallback(() => {
    navigationHolder.navigate('CpfScreen');
  }, [navigationHolder]);

  const scrollViewStyle = useViewStyles(() => [
    styles.scrollView,
    {

      padding: theme.spacings.sLarge,
      backgroundColor: theme.colors.neutralWhite,
    },
  ], [theme.colors.neutralWhite, theme.spacings.sLarge]);
  return (
    <ScrollView contentContainerStyle={scrollViewStyle}>
      <Container alignItems="center" justifyContent="center">
        <Spacer size={theme.spacings.sSmall} />
        <Text variant="headingSmall" color="neutralGray700">
          Tudo pronto!
        </Text>
        <Spacer size={theme.spacings.sXXS} />
        <Text color="neutralGray600" style={styles.message}>
          Agora você já pode aproveitar todas as vantagens da sua nova conta
        </Text>
        <Spacer size={theme.spacings.sSmall} />
      </Container>

      <Spacer size={theme.spacings.sLarge} />
      <Button testID="account-resume-continue-button" size="large" onPress={handleGoToMyAccount}>Acessar minha conta</Button>
    </ScrollView>

  );
};

export default App;
