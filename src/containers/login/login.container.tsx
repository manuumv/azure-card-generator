import * as React from 'react';
import { Checkbox, CssBaseline } from '@material-ui/core';
import { ErrorList } from 'async-validator';
import { SpinnerComponent } from '../../common/components/spinner';
import { LoginContext, SnackbarContext } from '../../common/providers';
import { UserService } from '../../common/services';
import { ContainerStyled, FormControlCheckbox, Input, LoginButton, LoginContainerStyled } from './login.container.styles';
import { login } from './services';
import { validateUser } from './validations';

export interface UserFormErrors {
  name: string,
  token: string,
  organization: string,
}

const defaultFormErrors: UserFormErrors = { name: null, organization: null, token: null };

export const LoginContainer: React.FunctionComponent = () => {
  const [username, setUsername] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<string>('');
  const [rememberUser, setRememberUser] = React.useState<boolean>(false);
  const [isLogging, setIsLogging] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<UserFormErrors>(defaultFormErrors);

  const { onLogin } = React.useContext(LoginContext);
  const { useSnackbar } = React.useContext(SnackbarContext)

  const onChangeUser = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setUsername(value);
  const onChangeToken = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setToken(value);
  const onChangeOrganization = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setOrganization(value);
  const onChangeRememberLogin = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setRememberUser(checked);

  const handleFormError = (errors: ErrorList) => {
    let userFormErrors: UserFormErrors = { name: null, organization: null, token: null };
    errors.forEach((error) => userFormErrors = { ...userFormErrors, [error.field]: error.message });
    setFormErrors(userFormErrors);
  }

  const onClickLogin = async () => {
    try {
      const user = { name: username, token, organization };
      await validateUser(user);
      setFormErrors(defaultFormErrors);
      UserService.set(user);
      setIsLogging(true);
      await login(organization);
      setIsLogging(false);
      onLogin(user, rememberUser);
    } catch (error) {
      UserService.set(null);
      UserService.remove();
      setIsLogging(false);
      (error.errors && error.fields) ? handleFormError(error.errors) : useSnackbar('Failed on login', 'error');
    }
  };

  return (
    <>
      <CssBaseline />
      <ContainerStyled>
        <LoginContainerStyled>
          <Input
            error={!!formErrors?.name}
            helperText={formErrors?.name}
            label="Username"
            value={username}
            onChange={onChangeUser}
          />
          <Input
            error={!!formErrors?.token}
            helperText={formErrors?.token}
            label="Token"
            value={token}
            onChange={onChangeToken}
          />
          <Input
            error={!!formErrors?.organization}
            helperText={formErrors?.organization}
            label="Organization"
            value={organization}
            onChange={onChangeOrganization}
          />
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
