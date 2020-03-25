import * as React from 'react';
import { shallow } from 'enzyme';
import { SpinnerComponent } from './spinner.component';
import { Spinner } from './spinner.component.styles';

describe('Spinner Component', () => {
  it('should render the expected component if isLoading is false', () => {
    // Arrange
    const isLoading = false;
    const text = 'test component'
    const children = <div>{text}</div>;

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
    const text = 'test component'
    const children = <div>{text}</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} >
        {children}
      </SpinnerComponent>
    );

    // Assert
    expect(component.containsMatchingElement(children)).toBeFalsy();
    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render the expected component if isLoading is false and displayChildren is true', () => {
    // Arrange
    const isLoading = false;
    const displayChildren = true;
    const children = <div>children</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} displayChildren={displayChildren} >
        {children}
      </SpinnerComponent>
    );

    // Assert
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeFalsy();
  });

  it('should render the expected component if isLoading is true and displayChildren is true', () => {
    // Arrange
    const isLoading = true;
    const displayChildren = true;
    const children = <div>children</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} displayChildren={displayChildren} >
        {children}
      </SpinnerComponent>
    );

    // Assert
    expect(component.containsMatchingElement(children)).toBeTruthy();
    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });
});
