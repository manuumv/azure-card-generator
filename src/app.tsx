import * as React from 'react';
import { LoginProvider, SnackbarProvider } from 'common/providers';
import { AppRouter } from './app.router';
import { CssBaseline } from '@material-ui/core';


export const App: React.FunctionComponent = () =>
  <LoginProvider>
    <SnackbarProvider>
      <CssBaseline />
      <AppRouter />
    </SnackbarProvider>
  </LoginProvider>

