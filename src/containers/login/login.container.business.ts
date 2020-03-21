import { ErrorList, FieldErrorList } from "async-validator";
import { UserService } from "../../common/services";
import { Color } from "@material-ui/lab";
import { User } from "../../model/entities";
import { validateUser } from "./validations";
import { login } from './services';

export interface UserFormErrors {
  name: string,
  token: string,
  organization: string,
}

export const formatFormErrors = (errors: ErrorList) => {
  let userFormErrors: UserFormErrors = { name: null, organization: null, token: null };

  if (!errors) {
    return userFormErrors;
  }

  errors.forEach((error) => userFormErrors = { ...userFormErrors, [error.field]: error.message });
  return userFormErrors;
}

export const onSuccessLogin = async (
  user: User,
  handleFormError: (errors: ErrorList) => void,
  handleIsLogging: (value: boolean) => void,
  onLogin: (user: User, rememberUser: boolean) => void,
) => {
  await validateUser(user);
  handleFormError(null);
  UserService.set(user);
  handleIsLogging(true);
  await login(user.organization);
  handleIsLogging(false);
  onLogin(user, user.remember);
}

export const onErrorLogin = (
  error: { errors: ErrorList, fields: FieldErrorList },
  setIsLogging: (isLoggin: boolean) => void,
  handleFormError: (errors: ErrorList) => void,
  useSnackbar: (message: string, severity: Color) => void
) => {
  UserService.set(null);
  UserService.remove();
  setIsLogging(false);
  (error.errors && error.fields) ? handleFormError(error.errors) : useSnackbar('Failed on login', 'error');
}
