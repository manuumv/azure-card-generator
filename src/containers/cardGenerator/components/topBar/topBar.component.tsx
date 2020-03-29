import *  as React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { Title, HeaderBar, UserName } from './topBar.component.styles';
import { LoginContext } from 'common/providers';
import { UserSessionService } from 'common/services';
import { pathOr } from 'ramda';

export const TopBarComponent: React.FunctionComponent = () => {
  const { onLogout } = React.useContext(LoginContext);

  const username = pathOr('', ['name'], UserSessionService.get());

  return (
    <HeaderBar position="relative">
      <Toolbar>
        <Title variant="h1">AZURE CARD GENERATOR</Title>
        <UserName>{username}</UserName>
        <Button onClick={onLogout} variant="outlined" color="inherit">Logout</Button>
      </Toolbar>
    </HeaderBar>
  )
}
