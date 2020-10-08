import * as React from 'react';
import { Input, FormControlCheckbox } from './userForm.component.styles';
import { UserForm, UserFormKeys, UserFormErrors } from '../viewmodel';
import { Checkbox } from '@material-ui/core';

interface Props {
  user: UserForm;
  formErrors: UserFormErrors;
  onChangeUser: (key: UserFormKeys, value: string | boolean) => void;
}

export const UserFormComponent: React.FunctionComponent<Props> = ({ user, formErrors, onChangeUser }) => {

  const onChange = (key: UserFormKeys) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeUser(key, value)
  }

  const onChangeRememberLogin = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => onChangeUser('remember', checked);

  return (
    <>
      <Input
        error={!!formErrors?.email}
        helperText={formErrors?.email}
        label="Email"
        value={user.email}
        onChange={onChange('email')}
      />
      <Input
        error={!!formErrors?.token}
        helperText={formErrors?.token}
        label="Token"
        value={user.token}
        onChange={onChange('token')}
      />
      <Input
        error={!!formErrors?.organization}
        helperText={formErrors?.organization}
        label="Organization"
        value={user.organization}
        onChange={onChange('organization')}
      />
      <FormControlCheckbox
        control={<Checkbox checked={user.remember} onChange={onChangeRememberLogin} value={user.remember} color="primary" />}
        label="Remember"
      />
    </>
  )
}
