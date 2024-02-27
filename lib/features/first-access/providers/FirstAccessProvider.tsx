import { createContextFactory } from 'mapping-context-rn';

type FirstAccessStateType = { smsPin: string };

const {
  Holder: FirstAccessHolder,
  Provider: FirstAccessProvider,
  useContext: useFirstAccessContext,
} = createContextFactory<FirstAccessStateType>();

export {
  FirstAccessHolder,
  FirstAccessProvider,
  useFirstAccessContext,
};
