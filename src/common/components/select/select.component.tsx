import * as React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { FormControlContainer } from './select.component.styles';
import { SelectValue } from '../../entities';

interface Props {
  values: SelectValue[];
  selectedValue: number | string;
  onChangeOption: (value: number | string) => void;
  label: string;
  id: string;
  disabled?: boolean;
}

export const SelectComponent: React.FunctionComponent<Props> = ({ selectedValue, values, onChangeOption, label, id, disabled }) => {

  const onChangeSelect = (event: React.ChangeEvent<{ name?: string; value: number }>) => {
    onChangeOption(event.target.value);
  }

  const isDisabled = !values || values && values.length === 0 ? true : disabled;
  const value = isDisabled ? '' : selectedValue;

  return (
    <FormControlContainer disabled={isDisabled}>
      <InputLabel shrink id={`label-${id}`}>{label}</InputLabel>
      <Select
        labelId={`label-${id}`}
        id={id}
        value={value}
        onChange={onChangeSelect}
        displayEmpty
      >
        <MenuItem value={''}>
          <em>None</em>
        </MenuItem>
        {Array.isArray(values) && values.map(({ name, value }, index) => (
          <MenuItem value={value} key={index}>{name}</MenuItem>
        ))}
      </Select>
    </FormControlContainer>
  )
}

SelectComponent.defaultProps = {
  disabled: false,
}
