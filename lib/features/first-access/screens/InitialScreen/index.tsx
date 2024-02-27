import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  useNavigationHolder,
} from 'mapping-context-rn';
import {
  Button,
  Container,
  useTheme,
  Icons,
  Spacer,
  Link,
} from 'mapping-style-guide-rn';

const styles = StyleSheet.create({
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const InitialScreen = () => {
  const theme = useTheme();
  const navigation = useNavigationHolder();

  const goToNextPage = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <Container>
      <Container padding={theme.spacings.sLarge} fillParent={false}>
        <Button
          testID="btn-start"
          onPress={goToNextPage}
          size="large"
        >
          Iniciar
        </Button>

        <Spacer size={theme.spacings.sXL} />

        <View style={styles.containerLink}>
          <Link
            testID="link-help-center"
            variant="secondary"
            size="large"
            onPress={goToNextPage}
            Icon={Icons.Thin.Call}
          >
            Informações
          </Link>
        </View>
        <Spacer size={theme.spacings.sNano} />
      </Container>
    </Container>
  );
};

export default InitialScreen;
