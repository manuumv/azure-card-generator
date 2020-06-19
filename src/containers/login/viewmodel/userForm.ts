import { User } from 'common/entities';

export interface UserForm extends User {
  remember: boolean;
}

export type UserFormKeys = keyof UserForm;

export interface UserFormErrors {
  email: string,
  token: string,
  organization: string,
}
