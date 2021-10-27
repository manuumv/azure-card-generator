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
import { ValidateError } from 'async-validator';

export const LoginContainer: React.FunctionComponent = () => {
  const [user, setUser] = React.useState<UserForm>({ email: '', organization: '', token: '', remember: false });
  const [isLogging, setIsLogging] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<UserFormErrors>({ email: null, organization: null, token: null });

  const { onLogin } = React.useContext(LoginContext);
  const { useSnackbar } = React.useContext(SnackbarContext)

  const onChangeUser = React.useCallback((key: UserFormKeys, value: string | boolean): void => (
    setUser({ ...user, [key]: value })
  ), [user]);

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      await handleSuccessfulLogin();
      setIsLogging(false);
      onLogin(user, user.remember);
    } catch (error) {
      handleErrorLogin(error);
      setIsLogging(false);
    }
  };

  const handleSuccessfulLogin = async (): Promise<void> => {
    await validateUser(user);
    setFormErrors({ email: null, organization: null, token: null });
    UserSessionService.set(user);
    setIsLogging(true);
    await getProjects(user.organization);
  };

  const handleErrorLogin = (error: { errors: ValidateError[], fields: Record<string, ValidateError> }): void => {
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
        <SpinnerComponent isLoading={isLogging} fullWidth={true}>
          <LoginButton disabled={isLogging} variant="contained" type="submit">Login</LoginButton>
        </SpinnerComponent>
      </LoginForm>
    </ContainerStyled>
  )
}
