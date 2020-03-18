import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import { LoginProvider, SnackbarProvider } from './common/providers';
import { AppRouter } from './app.router';

setConfig({ reloadHooks: false });

export const App: React.FunctionComponent = hot(() =>
  <LoginProvider>
    <SnackbarProvider>
      <AppRouter />
    </SnackbarProvider>
  </LoginProvider>
)
