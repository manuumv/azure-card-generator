import { ErrorList, FieldErrorList } from "async-validator";
import { UserSessionService } from "../../common/services/storage";
import { Color } from "@material-ui/lab";
import { User } from "../../model/entities";
import { validateUser } from "./validations";
import { getProjects } from '../../common/services/api';
import { UserForm } from "./viewmodel";

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
  user: UserForm,
  setFormErrors: (userFormErrors: UserFormErrors) => void,
  setIsLogging: (value: boolean) => void,
  onLogin: (user: User, rememberUser: boolean) => void,
) => {
  await validateUser(user);
  setFormErrors(formatFormErrors(null));
  UserSessionService.set(user);
  setIsLogging(true);
  await getProjects(user.organization);
  setIsLogging(false);
  onLogin(user, user.remember);
}

export const onErrorLogin = (
  error: { errors: ErrorList, fields: FieldErrorList },
  setIsLogging: (isLoggin: boolean) => void,
  setFormErrors: (userFormErrors: UserFormErrors) => void,
  useSnackbar: (message: string, severity: Color) => void
) => {
  UserSessionService.set(null);
  UserSessionService.remove();
  setIsLogging(false);
  (error.errors && error.fields) ? setFormErrors(formatFormErrors(error.errors)) : useSnackbar('Failed on login', 'error');
}
