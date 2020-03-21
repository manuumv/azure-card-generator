export interface User {
  name: string;
  organization: string;
  token: string;
  remember: boolean;
}

export type UserProperties = 'name' | 'organization' | 'token' | 'remember';
