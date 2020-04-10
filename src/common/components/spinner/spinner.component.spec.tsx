import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { SpinnerComponent } from './spinner.component';
import { Spinner, Container } from './spinner.component.styles';

describe('Spinner Component', () => {
  it('should render the expected component if isLoading is false', () => {
    // Arrange
    const isLoading = false;
    const text = 'children';
    const testComponent = <div>{text}</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading} >
        {testComponent}
      </SpinnerComponent>
    );
    const spinner = component.find(Spinner);

    // Assert
    expect(component.length).toBe(1);
    expect(component.text()).toBe(text);
    expect(spinner.length).toBe(0);
  });

  it('should render the expected component if isLoading is true', () => {
    // Arrange
    const isLoading = true;
    const text = 'children';
    const testComponent = <div>{text}</div>;

    // Act
    const component = shallow(
      <SpinnerComponent isLoading={isLoading}>
        {testComponent}
      </SpinnerComponent>
    );
    const container = component.find(Container);
    const spinner = component.find(Spinner);

    // Assert
    expect(container.length).toBe(1);
    expect(component.length).toBe(1);
    expect(component.text()).toBe(text);
    expect(spinner.length).toBe(1);
  });

  it('should render the expected component if isLoading is true and fullWidth is true', () => {
    // Arrange
    const isLoading = true;
    const text = 'children';
    const testComponent = <div>{text}</div>;
    const fullWidth = true;
    const expectedSize = { width: '100%', height: 'inherit' };

    // Act
    const component = mount(
      <SpinnerComponent isLoading={isLoading} fullWidth={fullWidth}>
        {testComponent}
      </SpinnerComponent>
    );
    const container = component.find(Container);
    const spinner = component.find(Spinner);

    // Assert
    expect(container.length).toBe(1);
    expect(container.prop('style')).toEqual(expectedSize);
    expect(component.text()).toBe(text);
    expect(spinner.length).toBe(1);
  });


  it('should render the expected component if isLoading is true and fullHeight is true', () => {
    // Arrange
    const isLoading = true;
    const text = 'children';
    const testComponent = <div>{text}</div>;
    const fullHeight = true;
    const expectedSize = { height: '100%', width: 'inherit' };

    // Act
    const component = mount(
      <SpinnerComponent isLoading={isLoading} fullHeight={fullHeight}>
        {testComponent}
      </SpinnerComponent>
    );
    const container = component.find(Container);
    const spinner = component.find(Spinner);

    // Assert
    expect(container.length).toBe(1);
    expect(container.prop('style')).toEqual(expectedSize);
    expect(component.text()).toBe(text);
    expect(spinner.length).toBe(1);
  });
});
