import * as React from 'react';
import { SpinnerComponent } from 'common/components';
import { shallow } from "enzyme";
import { UserFormComponent } from './components';
import { LoginContainer } from './login.container';
import { LoginButton, LoginForm } from './login.container.styles';

describe('LoginContainer' , () => {
  it('should render the expected component', async() => {
      // Act
      const container = shallow(<LoginContainer />);
      const userFormComponent = container.find(UserFormComponent);
      const loginButton = container.find(LoginButton);
      const spinnerComponent = container.find(SpinnerComponent);
      const loginForm = container.find(LoginForm);

      // Assert
      expect(userFormComponent.length).toBe(1);
      expect(loginButton.length).toBe(1);
      expect(spinnerComponent.length).toBe(1);
      expect(loginForm.length).toBe(1);
  });
});
