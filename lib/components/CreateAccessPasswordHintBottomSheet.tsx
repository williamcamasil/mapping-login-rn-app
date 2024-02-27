import React from 'react';

import {
  BottomSheet, BottomSheetPropsType, Button, Container, HintList, Icons, Spacer, Text, useTheme,
} from 'mapping-style-guide-rn';

const firstPasswordHintList = [
  'Não use a data do seu aniversário',
  'Não use sequências de números',
];

const fullHintList = [
  'Não repita uma senha já utilizada',
  ...firstPasswordHintList,
];

type CreateAccessPasswordHintBottomSheetPropsType = BottomSheetPropsType & {
  firstPassword?: boolean;
};

const CreateAccessPasswordHintBottomSheet: React.FC<CreateAccessPasswordHintBottomSheetPropsType> = ({
  firstPassword, ...props
}) => {
  const theme = useTheme();

  return (
    <BottomSheet dismissible={false} {...props}>
      <BottomSheet.Title>Dicas para criar sua senha de acesso</BottomSheet.Title>
      <HintList bulletPointColor="neutralGray400" hintList={firstPassword ? firstPasswordHintList : fullHintList} />
      <Container horizontal fillParent={false}>
        <Icons.Default.Information color={theme.colors.primaryMain} />
        <Spacer size={theme.spacings.sXXS} />
        <Text color="neutralGray600">
          Anote essa senha, ela será usada para acessar sua conta.
        </Text>
      </Container>
      <BottomSheet.Actions>
        <Button size="large" onPress={props.onDismiss}>
          Entendi
        </Button>

      </BottomSheet.Actions>
    </BottomSheet>
  );
};

export default CreateAccessPasswordHintBottomSheet;
