import { SubmoduleMiniAppRegisterType } from 'mapping-context-rn';

import Navigation from './navigation';

const registerSubmodule: SubmoduleMiniAppRegisterType = () => ({
  name: 'LOGIN',
  navigator: Navigation,
});

export default registerSubmodule;
