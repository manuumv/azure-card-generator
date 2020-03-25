import * as React from 'react';
import { LoginProvider, LoginContext } from './loginContext';
import { mount } from 'enzyme';
import { UserSessionService } from 'common/services';
import { User } from 'common/entities';

describe('LoginContext', () => {

  beforeEach(() => UserSessionService.remove());

  describe('LoginProvider', () => {
    it('should mount the expected component and call userSessionService', () => {
      // Assert
      const children = <div>test</div>;
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get');

      // Act
      const component = mount(
        <LoginProvider>
          {children}
        </LoginProvider>
      );

      // Arrange
      expect(component.containsMatchingElement(children)).toBeTruthy();
      expect(spyUserSessionServiceGet).toHaveBeenCalled();
    })
  });

  describe('LoginConsumer', () => {
    it('should do login and set the new user and should not save the session if remeberLogin is false', () => {
      // Assert
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get');
      const spyUserSessionServiceSave = jest.spyOn(UserSessionService, 'save');
      const newUser: User = { name: 'test', organization: 'test', token: '' };
      const rememberLogin = false;
      const expectedResult = JSON.stringify(newUser);

      // Act
      const component = mount(
        <LoginProvider>
          <LoginContext.Consumer>
            {({ onLogin, user }) => (
              <>
                <button onClick={() => onLogin(newUser, rememberLogin)} />
                <span>{JSON.stringify(user)}</span>
              </>
            )}
          </LoginContext.Consumer>
        </LoginProvider>
      );

      const button = component.find('button');
      const span = component.find('span');

      // Arrange
      expect(span.text()).toEqual(JSON.stringify(null));
      button.simulate('click');
      expect(spyUserSessionServiceGet).toHaveBeenCalled();
      expect(spyUserSessionServiceSave).not.toHaveBeenCalled();
      expect(span.text()).toEqual(expectedResult);
    })

    it('should do login and set the new user and should save the session if remeberLogin is true', () => {
      // Assert
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get');
      const spyUserSessionServiceSave = jest.spyOn(UserSessionService, 'save');
      const newUser: User = { name: 'test', organization: 'test', token: '' };
      const rememberLogin = true;
      const expectedResult = JSON.stringify(newUser);

      // Act
      const component = mount(
        <LoginProvider>
          <LoginContext.Consumer>
            {({ onLogin, user }) => (
              <>
                <button onClick={() => onLogin(newUser, rememberLogin)} />
                <span>{JSON.stringify(user)}</span>
              </>
            )}
          </LoginContext.Consumer>
        </LoginProvider>
      );

      const button = component.find('button');
      const span = component.find('span');

      // Arrange
      expect(span.text()).toEqual(JSON.stringify(null));
      button.simulate('click');
      expect(spyUserSessionServiceGet).toHaveBeenCalled();
      expect(spyUserSessionServiceSave).toHaveBeenCalledWith(newUser);
      expect(span.text()).toEqual(expectedResult);
    })

    it('should do logout and set the current user to null and remove it from localStorage', () => {
      // Assert
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get');
      const spyUserSessionServiceRemove = jest.spyOn(UserSessionService, 'remove');
      const expectedResult = JSON.stringify(null);

      // Act
      const component = mount(
        <LoginProvider>
          <LoginContext.Consumer>
            {({ onLogout, user }) => (
              <>
                <button onClick={onLogout} />
                <span>{JSON.stringify(user)}</span>
              </>
            )}
          </LoginContext.Consumer>
        </LoginProvider>
      );

      const button = component.find('button');
      const span = component.find('span');
      button.simulate('click');

      // Arrange
      expect(spyUserSessionServiceGet).toHaveBeenCalled();
      expect(spyUserSessionServiceRemove).toHaveBeenCalled();
      expect(span.text()).toEqual(expectedResult);
    })
  })
})
