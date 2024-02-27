import React from 'react';

import {
  BottomSheet, BottomSheetPropsType, Button, Container, HintList, Icons, Spacer, Text, useTheme,
} from 'mapping-style-guide-rn';

const firstSignatureHintList = [
  'Deve ser diferente da senha de acesso',
  'Não use a data do seu aniversário',
  'Não use sequências de números',
];

const fullHintList = [
  'Não repita uma assinatura já utilizada',
  ...firstSignatureHintList,
];

type CreateDigitalSignatureHintBottomSheetPropsType = BottomSheetPropsType & {
  firstDigitalSignature?: boolean;
};

const CreateDigitalSignatureHintBottomSheet: React.FC<CreateDigitalSignatureHintBottomSheetPropsType> = ({
  firstDigitalSignature, ...props
}) => {
  const theme = useTheme();

  return (
    <BottomSheet dismissible={false} {...props}>
      <BottomSheet.Title>Dicas para criar sua assinatura eletrônica</BottomSheet.Title>
      <HintList bulletPointColor="neutralGray400" hintList={firstDigitalSignature ? firstSignatureHintList : fullHintList} />
      <Container horizontal fillParent={false}>
        <Icons.Default.Information color={theme.colors.primaryMain} />
        <Spacer size={theme.spacings.sXXS} />
        <Text color="neutralGray600">
          Anote essa senha, ela será utilizada em transferências, Pix, pagamentos entre outros.
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

export default CreateDigitalSignatureHintBottomSheet;
