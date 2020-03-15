import * as React from "react";
import { AccountInfo } from "../../model/entities";
import { localStorageAccountInfo } from "../services";

interface AccountInfoContext {
  onLogin: () => void;
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
    loggedInfo ? setIsUserLogged(true) : setIsUserLogged(false);
  }, []);

  const onLogout = React.useCallback(() => {
    localStorageAccountInfo.remove();
    setIsUserLogged(false);
  }, []);

  const onLogin = React.useCallback(() => setIsUserLogged(true), []);

  return (
    <ReactLoginContext.Provider value={{ isUserLogged, onLogin, onLogout }}>
      {props.children}
    </ReactLoginContext.Provider>
  );
};
