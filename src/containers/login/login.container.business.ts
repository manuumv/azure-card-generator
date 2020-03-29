import { ErrorList } from 'async-validator';
import { UserFormErrors } from './viewmodel';

export const formatFormErrors = (errors: ErrorList): UserFormErrors => {
  let userFormErrors: UserFormErrors = { name: null, organization: null, token: null };

  if (!errors) {
    return userFormErrors;
  }

  errors.forEach((error) => userFormErrors = { ...userFormErrors, [error.field]: error.message });
  return userFormErrors;
}
