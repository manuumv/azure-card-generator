import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import { ReactLoginInfoProvider } from './common/providers';
import { AppRouter } from './app.router';

setConfig({ reloadHooks: false });

export const App: React.FunctionComponent = hot(() =>
  <ReactLoginInfoProvider>
    <AppRouter />
  </ReactLoginInfoProvider>
)
