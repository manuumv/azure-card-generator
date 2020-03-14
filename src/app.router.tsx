import * as React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { LoginContainer } from "./containers/login/login.container";
import { CardGeneratorContainer } from "./containers/cardGenerator/cardGenerator.container";
import { ReactLoginContext } from "./common/providers";

export const AppRouter: React.FunctionComponent = () => {
  const { isUserLogged } = React.useContext(ReactLoginContext);

  return (
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => isUserLogged ? <CardGeneratorContainer /> : <LoginContainer />}
        />
      </Switch>
    </HashRouter>
  );
};
