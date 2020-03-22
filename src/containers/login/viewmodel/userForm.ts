import { User } from 'common/entities';

export interface UserForm extends User {
  remember: boolean;
}

export type UserFormKeys = 'name' | 'organization' | 'token' | 'remember';

export interface UserFormErrors {
  name: string,
  token: string,
  organization: string,
}
