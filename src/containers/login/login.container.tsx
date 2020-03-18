import * as React from 'react';
import { LoginContainerStyled, ContainerStyled, LoginButton, Input, FormControlCheckbox } from './login.container.styles';
import { CssBaseline, Checkbox } from '@material-ui/core';
import { login } from './services';
import { UserService } from '../../common/services';
import { LoginContext, SnackbarContext } from '../../common/providers';
import { SpinnerComponent } from '../../common/components/spinner';

export const LoginContainer: React.FunctionComponent = () => {
  const [username, setUsername] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<string>('');
  const [rememberUser, setRememberUser] = React.useState<boolean>(false);
  const [isLogging, setIsLogging] = React.useState<boolean>(false);

  const { onLogin } = React.useContext(LoginContext);
  const { useSnackbar } = React.useContext(SnackbarContext)

  const onChangeUser = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setUsername(value);
  const onChangeToken = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setToken(value);
  const onChangeOrganization = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setOrganization(value);
  const onChangeRememberLogin = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setRememberUser(checked);

  const onClickLogin = async () => {
    if (!username || !token || !organization) {
      return;
    }

    try {
      const user = { name: username, token, organization };
      UserService.set(user);
      setIsLogging(true);
      await login(organization);
      setIsLogging(false);
      onLogin(user, rememberUser);
    } catch (error) {
      UserService.set(null);
      UserService.remove();
      console.log(error);
      useSnackbar('Failed on login', 'error');
      setIsLogging(false);
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
          <FormControlCheckbox
            control={<Checkbox checked={rememberUser} onChange={onChangeRememberLogin} value={rememberUser} color="primary" />}
            label="Remember"
          />
          <SpinnerComponent displayChildren={true} isLoading={isLogging}>
            <LoginButton disabled={isLogging} variant="contained" onClick={onClickLogin} >Login</LoginButton>
          </SpinnerComponent>
        </LoginContainerStyled>
      </ContainerStyled>
    </>
  )
}
