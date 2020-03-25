import * as React from "react";
import { User } from "../../entities";
import { UserSessionService } from "../../services";

interface UserContext {
  onLogin: (user: User, rememberLogin: boolean) => void;
  onLogout: () => void;
  user: User;
}

const defaultUserContext: UserContext = {
  user: null,
  onLogin: () => { },
  onLogout: () => { }
};

export const LoginContext = React.createContext<UserContext>(defaultUserContext);

export const LoginProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    const loggedInfo = UserSessionService.get();
    if (loggedInfo) {
      setUser(loggedInfo);
    }
  }, []);

  const onLogout = React.useCallback(() => {
    UserSessionService.remove();
    setUser(null);
  }, []);

  const onLogin = React.useCallback((user: User, rememberLogin: boolean) => {
    setUser(user);

    if (rememberLogin) {
      UserSessionService.save(user);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </LoginContext.Provider>
  );
};
