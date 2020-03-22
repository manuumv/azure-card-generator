import * as React from 'react';
import { ErrorList } from 'async-validator';
import { SpinnerComponent } from '../../common/components/spinner';
import { LoginContext, SnackbarContext } from '../../common/providers';
import { UserForm, UserFormKeys } from './viewmodel';
import { UserFormComponent } from './components';
import { formatFormErrors, onErrorLogin, onSuccessLogin, UserFormErrors } from './login.container.business';
import { ContainerStyled, LoginButton, LoginForm } from './login.container.styles';

export const LoginContainer: React.FunctionComponent = () => {
  const [user, setUser] = React.useState<UserForm>({ name: '', organization: '', token: '', remember: false });
  const [isLogging, setIsLogging] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<UserFormErrors>({ name: null, organization: null, token: null });

  const { onLogin } = React.useContext(LoginContext);
  const { useSnackbar } = React.useContext(SnackbarContext)

  const handleFormError = React.useCallback((errors: ErrorList) => setFormErrors(formatFormErrors(errors)), [formErrors]);
  const handleIsLogging = React.useCallback((value: boolean) => setIsLogging(value), [isLogging]);
  const onChangeUser = React.useCallback((key: UserFormKeys, value: string | boolean) => (
    setUser({ ...user, [key]: value })
  ), [user]);

  const onClickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await onSuccessLogin(user, handleFormError, handleIsLogging, onLogin);
    } catch (error) {
      onErrorLogin(error, handleIsLogging, handleFormError, useSnackbar)
    }
  };

  return (
    <ContainerStyled>
      <LoginForm onSubmit={onClickLogin}>
        <UserFormComponent
          formErrors={formErrors}
          user={user}
          onChangeUser={onChangeUser}
        />
        <SpinnerComponent displayChildren={true} isLoading={isLogging}>
          <LoginButton disabled={isLogging} variant="contained" type="submit">Login</LoginButton>
        </SpinnerComponent>
      </LoginForm>
    </ContainerStyled>
  )
}
