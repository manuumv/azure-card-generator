import * as React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { LoginContainer } from './containers/login/login.container';
import { CardGeneratorContainer } from './containers/cardGenerator/cardGenerator.container';
import { LoginContext } from './common/providers';

export const AppRouter: React.FunctionComponent = () => {
  const { user } = React.useContext(LoginContext);

  return (
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => user ? <CardGeneratorContainer /> : <LoginContainer />}
        />
      </Switch>
    </HashRouter>
  );
};
