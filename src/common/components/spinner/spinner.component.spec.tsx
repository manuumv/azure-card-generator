import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { SpinnerComponent } from './spinner.component';
import { Spinner } from './spinner.component.styles';

describe('Spinner Component', () => {
  it('should render the expected component if isLoading is false', () => {
    // Arrange
    const isLoading = false;
    const children = <div>children</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} >
        {children}
      </SpinnerComponent>
    );

    // Assert
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeFalsy();
  });

  it('should render the expected component if isLoading is true', () => {
    // Arrange
    const isLoading = true;
    const children = <div>children</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading}>
        {children}
      </SpinnerComponent>
    );

    // Assert
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render the expected component if isLoading is true and fullWidth is true', () => {
    // Arrange
    const isLoading = true;
    const children = <div>children</div>;
    const fullWidth = true;
    const expectedWidth = { width: '100%', height: 'inherit' };

    // Act
    const component = mount(
      <SpinnerComponent isLoading={isLoading} fullWidth={fullWidth}>
        {children}
      </SpinnerComponent>
    );
    const spinner = component.childAt(0);

    // Assert
    expect(spinner.prop('style')).toEqual(expectedWidth);
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });


  it('should render the expected component if isLoading is true and fullHeight is true', () => {
    // Arrange
    const isLoading = true;
    const children = <div>children</div>;
    const fullHeight = true;
    const expectedHeight = { height: '100%', width: 'inherit' };

    // Act
    const component = mount(
      <SpinnerComponent isLoading={isLoading} fullHeight={fullHeight}>
        {children}
      </SpinnerComponent>
    );
    const spinner = component.childAt(0);

    // Assert
    expect(spinner.prop('style')).toEqual(expectedHeight);
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });
});
