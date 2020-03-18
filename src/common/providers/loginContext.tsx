import * as React from "react";
import { User } from "../../model/entities";
import { UserService } from "../services";

interface UserContext {
  onLogin: (user: User, rememberUser: boolean) => void;
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
    const loggedInfo = UserService.get();
    if (loggedInfo) {
      setUser(loggedInfo);
    }
  }, []);

  const onLogout = React.useCallback(() => {
    UserService.remove();
    setUser(null);
  }, []);

  const onLogin = React.useCallback((user: User, rememberUser: boolean) => {
    setUser(user);

    if(rememberUser) {
      UserService.save(user);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </LoginContext.Provider>
  );
};
