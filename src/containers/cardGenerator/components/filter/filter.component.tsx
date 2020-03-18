import * as React from 'react';
import { Select, Checkbox, ListItemText, MenuItem, FormControl } from '@material-ui/core';
import { Label, SelectInput } from './filter.component.styles';

interface Props {
  states: string[];
  filters: string[];
  handleChangeFilters: (event: React.ChangeEvent<{ name?: string; value: string[] }>) => void;
}

export const FilterComponent: React.FunctionComponent<Props> = ({ states, handleChangeFilters, filters }) => (
  <FormControl disabled={!states || states && states.length === 0}>
    <Label id="filter-state-label">States filter:</Label>
    <Select
      labelId="filter-state-label"
      id="filter-state"
      multiple
      value={filters}
      onChange={handleChangeFilters}
      input={<SelectInput />}
      renderValue={selected => (selected as any).join(', ')}
    >
      {
        Array.isArray(states) && states.map((state, index) => (
          <MenuItem key={index} value={state}>
            <Checkbox checked={filters.indexOf(state) > -1} />
            <ListItemText primary={state} />
          </MenuItem>
        ))
      }
    </Select>
  </FormControl >
)
