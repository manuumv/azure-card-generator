import *  as React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { Title, HeaderBar, UserName } from './appBar.component.styles';
import { LoginContext } from '../../../../common/providers';
import { UserService } from '../../../../common/services';

export const AppBarComponent: React.FunctionComponent = () => {
  const { onLogout } = React.useContext(LoginContext);

  const username = UserService.get()?.name;

  return (
    <HeaderBar position="relative">
      <Toolbar>
        <Title variant="h4">AZURE CARD GENERATOR</Title>
        <UserName>{username}</UserName>
        <Button variant="outlined" onClick={onLogout} color="inherit">Logout</Button>
      </Toolbar>
    </HeaderBar>
  )
}
