import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
  values: any[];
  selectedValue: number | string;
  onChangeOption: React.Dispatch<React.SetStateAction<any>>;
  label: string;
  id: string;
}

export const SelectComponent: React.FunctionComponent<Props> = ({ selectedValue, values, onChangeOption, label, id }) => {

  const onChangeSelect = (event: React.ChangeEvent<{ name?: string; value: number }>) => {
    onChangeOption(event.target.value);
  }

  return (
    <FormControl>
      <InputLabel shrink id={`label-${id}`}>{label}</InputLabel>
      <Select
        labelId={`label-${id}`}
        id={id}
        value={selectedValue}
        onChange={onChangeSelect}
        displayEmpty
      >
        <MenuItem value={''}>
          <em>None</em>
        </MenuItem>
        {Array.isArray(values) && values.map((value, index) => (
          <MenuItem value={index} key={index}>{value?.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
