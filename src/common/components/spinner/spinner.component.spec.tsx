import * as React from 'react';
import { shallow } from 'enzyme';
import { SpinnerComponent } from './spinner.component';

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
    expect(component).toMatchSnapshot();
  });

  it('should render the expected component if isLoading is true', () => {
    // Arrange
    const isLoading = true;
    const children = <div>children</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} >
        {children}
      </SpinnerComponent>
    );
    // Assert
    expect(component).toMatchSnapshot();
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
    expect(component).toMatchSnapshot();
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
    expect(component).toMatchSnapshot();
  });
});
