import * as React from 'react';
import { AccountInfo } from '../../model/entities';
import { localStorageAccountInfo } from '../services';

interface AccountInfoContext {
  onLogin: (accountInfo: AccountInfo) => void;
  isLogged: boolean,
}

const defaultAccountInfoContext: AccountInfoContext = {
  isLogged: false,
  onLogin: () => { },
}

export const ReactLoginContext = React.createContext<AccountInfoContext>(defaultAccountInfoContext);

export const ReactLoginInfoProvider: React.FunctionComponent = (props) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loggedInfo = localStorageAccountInfo.get();

    if (loggedInfo) {
      setIsLogged(true);
    }
  }, []);

  const onLogin = React.useCallback(() => setIsLogged(true), [isLogged])
  return (
    <ReactLoginContext.Provider value={{ isLogged, onLogin }}>
      {props.children}
    </ReactLoginContext.Provider>
  )
}
