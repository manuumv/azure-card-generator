import *  as React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Title } from './appBar.component.styles';
import { ReactLoginContext } from '../../../../common/providers';


export const AppBarComponent: React.FunctionComponent = () => {
  const { onLogout } = React.useContext(ReactLoginContext)
  return (
    <AppBar position="relative">
      <Toolbar>
        <Title variant="h4">AZURE CARD GENERATOR</Title>
        <Button onClick={onLogout} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
