import * as React from "react";
import { AccountInfo } from "../../model/entities";
import { localStorageAccountInfo } from "../services";

interface AccountInfoContext {
  onLogin: (accountInfo: AccountInfo) => void;
  onLogout: () => void;
  isUserLogged: boolean;
}

const defaultAccountInfoContext: AccountInfoContext = {
  isUserLogged: false,
  onLogin: () => { },
  onLogout: () => { }
};

export const ReactLoginContext = React.createContext<AccountInfoContext>(
  defaultAccountInfoContext
);

export const ReactLoginInfoProvider: React.FunctionComponent = props => {
  const [isUserLogged, setIsUserLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loggedInfo = localStorageAccountInfo.get();

    if (loggedInfo) {
      setIsUserLogged(true);
    }
  }, []);

  const onLogout = React.useCallback(() => localStorageAccountInfo.remove(), []);
  const onLogin = React.useCallback(() => setIsUserLogged(true), [isUserLogged]);

  return (
    <ReactLoginContext.Provider value={{ isUserLogged, onLogin, onLogout }}>
      {props.children}
    </ReactLoginContext.Provider>
  );
};
