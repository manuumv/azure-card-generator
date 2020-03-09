import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import { LoginContainer } from './containers/login/login.container';
import { ReactLoginInfoProvider } from './common/providers';

setConfig({ reloadHooks: false });

export const App: React.FunctionComponent = hot(() =>
  <ReactLoginInfoProvider>
    <LoginContainer />
  </ReactLoginInfoProvider>
)
