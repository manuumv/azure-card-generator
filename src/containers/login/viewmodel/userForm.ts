import { User } from '../../../model/entities';

export interface UserForm extends User {
  remember: boolean;
}

export type UserFormKeys = 'name' | 'organization' | 'token' | 'remember';
