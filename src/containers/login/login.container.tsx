import * as React from 'react';
import { SpinnerComponent } from 'common/components/spinner';
import { LoginContext, SnackbarContext } from 'common/providers';
import { UserFormComponent } from './components';
import { ContainerStyled, LoginButton, LoginForm } from './login.container.styles';
import { UserForm, UserFormKeys, UserFormErrors } from './viewmodel';
import { UserSessionService } from 'common/services';
import { validateUser } from './validations';
import { formatFormErrors } from './login.container.business';
import { getProjects } from 'api/rest';
import { ErrorList } from 'async-validator';

export const LoginContainer: React.FunctionComponent = () => {
  const [user, setUser] = React.useState<UserForm>({ name: '', organization: '', token: '', remember: false });
  const [isLogging, setIsLogging] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<UserFormErrors>({ name: null, organization: null, token: null });

  const { onLogin } = React.useContext(LoginContext);
  const { useSnackbar } = React.useContext(SnackbarContext)

  const onChangeUser = React.useCallback((key: UserFormKeys, value: string | boolean) => (
    setUser({ ...user, [key]: value })
  ), [user]);

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await handleSuccessfulLogin();
    } catch (error) {
      handleErrorLogin(error);
    } finally {
      setIsLogging(false);
    }
  };

  const handleSuccessfulLogin = async () => {
    await validateUser(user);
    setFormErrors({ name: null, organization: null, token: null });
    UserSessionService.set(user);
    setIsLogging(true);
    await getProjects(user.organization);
    onLogin(user, user.remember);
  };

  const handleErrorLogin = (error: { errors: ErrorList, fields: Record<string, ErrorList> }) => {
    UserSessionService.set(null);
    if (error.errors && error.fields) {
      setFormErrors(formatFormErrors(error.errors));
    } else {
      useSnackbar('Failed on login', 'error');
    }
  };

  return (
    <ContainerStyled>
      <LoginForm onSubmit={onSubmitLogin}>
        <UserFormComponent
          formErrors={formErrors}
          user={user}
          onChangeUser={onChangeUser}
        />
        <SpinnerComponent isLoading={isLogging}>
          <LoginButton disabled={isLogging} variant="contained" type="submit">Login</LoginButton>
        </SpinnerComponent>
      </LoginForm>
    </ContainerStyled>
  )
}
