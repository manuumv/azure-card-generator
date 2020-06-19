import *  as React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { Title, HeaderBar, UserEmail } from './topBar.component.styles';
import { LoginContext } from 'common/providers';
import { UserSessionService } from 'common/services';

export const TopBarComponent: React.FunctionComponent = () => {
  const { onLogout } = React.useContext(LoginContext);

  const email = UserSessionService.get()?.email ?? '';

  return (
    <HeaderBar position="relative">
      <Toolbar>
        <Title variant="h1">AZURE CARD GENERATOR</Title>
        <UserEmail>{email}</UserEmail>
        <Button onClick={onLogout} variant="outlined" color="inherit">Logout</Button>
      </Toolbar>
    </HeaderBar>
  )
}
