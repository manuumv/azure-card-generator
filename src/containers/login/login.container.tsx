import * as React from 'react';
import { LoginContainerStyled, ContainerStyled, LoginButton, Input } from './login.container.styles';
import { CssBaseline } from '@material-ui/core';
import { login } from './services';
import { localStorageAccountInfo } from '../../common/services';
import { ReactLoginContext } from '../../common/providers';

export const LoginContainer: React.FunctionComponent = () => {
  const [username, setUsername] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<string>('');

  const { onLogin } = React.useContext(ReactLoginContext);

  const onChangeUser = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setUsername(value);
  const onChangeToken = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setToken(value);
  const onChangeOrganization = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setOrganization(value);

  const onClickLogin = async () => {
    if (!username || !token || !organization) {
      return;
    }

    try {
      localStorageAccountInfo.set({ username, token, organization });
      await login(organization);
      onLogin();
    } catch (error) {
      localStorageAccountInfo.remove();
      console.log(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <ContainerStyled>
        <LoginContainerStyled>
          <Input label="User" value={username} onChange={onChangeUser} />
          <Input label="Token" value={token} onChange={onChangeToken} />
          <Input label="Organization" value={organization} onChange={onChangeOrganization} />
          <LoginButton variant="contained" onClick={onClickLogin} >Login</LoginButton>
        </LoginContainerStyled>
      </ContainerStyled>
    </>
  )
}
