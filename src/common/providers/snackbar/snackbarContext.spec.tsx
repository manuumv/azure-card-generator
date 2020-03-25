import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { SnackbarProvider, SnackbarContext } from './snackbarContext';

describe('SnackbarContext', () => {

  describe('SnackbarProvider', () => {
    it('should mount the expected component', () => {
      // Assert
      const children = <div>test</div>;

      // Act
      const component = shallow(
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      );

      // Arrange
      expect(component.containsMatchingElement(children)).toBeTruthy();
    })
  });

  describe('SnackbarContext', () => {
    it('should mount the expected component and change the expected states if useSnackbar is called', () => {
      // Assert
      const message = 'test';
      const severity = 'success';

      // Act
      const component = mount(
        <SnackbarProvider>
          <SnackbarContext.Consumer>
            {({ useSnackbar }) => <button onClick={() => useSnackbar(message, severity)} />}
          </SnackbarContext.Consumer>
        </SnackbarProvider>
      );

      const button = component.find('button');

      // Arrange
      expect(component.childAt(0).prop('open')).toBeFalsy();
      button.simulate('click');
      expect(component.childAt(0).prop('open')).toBeTruthy();
      expect(component.childAt(0).text()).toBe(message);
    })
  });
})
