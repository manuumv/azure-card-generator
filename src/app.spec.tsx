import * as React from 'react';
import { App } from './app';
import { shallow } from 'enzyme';

describe('test', () => {
  it('should be true', () => {
    // Assert
    expect(true).toBeTruthy();
  })

  it('should render the expected component', () => {
    // Act
    const component = shallow(<App />, {});

    // Assert
    expect(component).toHaveLength(1);
  })
})
