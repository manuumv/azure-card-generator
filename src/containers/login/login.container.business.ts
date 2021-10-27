import { ValidateError } from 'async-validator';
import { UserFormErrors } from './viewmodel';

export const formatFormErrors = (errors: ValidateError[]): UserFormErrors => {
  let userFormErrors: UserFormErrors = { email: null, organization: null, token: null };

  if (!errors) {
    return userFormErrors;
  }

  errors.forEach((error) => userFormErrors = { ...userFormErrors, [error.field]: error.message });
  return userFormErrors;
}
