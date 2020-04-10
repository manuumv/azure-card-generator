import * as React from 'react';
import { shallow } from 'enzyme';
import { SelectComponent } from './select.component';
import { SelectValue } from 'common/entities';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

describe('Select Component', () => {
  it('should render the expected component if values are empty', () => {
    // Arrange
    const id = 'test';
    const label = 'test component'
    const selectedValue: number | string = '';
    const values: SelectValue[] = [];
    const onChangeOption = jest.fn();
    const props = { values, id, label, selectedValue, onChangeOption };

    // Act
    const component = shallow(
      <SelectComponent {...props} />
    );
    const input = component.find(InputLabel);
    const select = component.find(Select);
    const em = select.find('em');

    // Assert
    expect(component.prop('disabled')).toBeTruthy();
    expect(input.prop('id')).toBe(`label-${id}`);
    expect(input.prop('shrink')).toBeTruthy();
    expect(input.prop('children')).toBe(label);
    expect(select.prop('labelId')).toBe(`label-${id}`);
    expect(select.prop('id')).toBe(id);
    expect(select.prop('onChange')).toBeInstanceOf(Function);
    expect(select.prop('value')).toBe(selectedValue);
    expect(select.prop('displayEmpty')).toBeTruthy();
    expect(em.text()).toBe('None');
  });

  it('should render the expected component with the expected values', () => {
    // Arrange
    const id = 'test';
    const label = 'test component'
    const selectedValue: number | string = '';
    const values: SelectValue[] = [{ name: 'test', value: 1 }];
    const onChangeOption = jest.fn();
    const props = { values, id, label, selectedValue, onChangeOption };

    // Act
    const component = shallow(
      <SelectComponent {...props} />
    );
    const input = component.find(InputLabel);
    const select = component.find(Select);
    const em = select.find('em');
    const menuItem = select.find(MenuItem).last();

    // Assert
    expect(component.prop('disabled')).toBeFalsy();
    expect(input.prop('id')).toBe(`label-${id}`);
    expect(input.prop('shrink')).toBeTruthy();
    expect(input.prop('children')).toBe(label);
    expect(select.prop('labelId')).toBe(`label-${id}`);
    expect(select.prop('id')).toBe(id);
    expect(select.prop('value')).toBe(selectedValue);
    expect(select.prop('displayEmpty')).toBeTruthy();
    expect(em.text()).toBe('None');
    expect(menuItem.prop('value')).toBe(values[0].value);
    expect(menuItem.text()).toBe(values[0].name);
  });

  it('should render call the expected function if change event is triggered', () => {
    // Arrange
    const id = 'test';
    const label = 'test component'
    const selectedValue: number | string = 1;
    const values: SelectValue[] = [{ name: 'test', value: 1 }];
    const onChangeOption = jest.fn();
    const props = { values, id, label, selectedValue, onChangeOption };

    // Act
    const component = shallow(
      <SelectComponent {...props} />
    );
    const select = component.childAt(1);
    select.simulate('change', { target: { value: 1 } });

    // Assert
    expect(onChangeOption).toHaveBeenCalled();
  });
});
