import * as userSession from './userSession';
import { User } from 'common/entities';

describe('userSession', () => {
  const key = 'user';

  beforeEach(() => localStorage.removeItem('user'));

  describe('load user', () => {
    it('should call localStorage.getItem with the expected key and return null if user is null', () => {
      // Arrange
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

      // Act
      const result = userSession.loadUser();

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    })

    it('should call localStorage.getItem with the expected key and return the expected user', () => {
      // Arrange
      const user: User = { name: '', organization: '', token: '' };
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(user));

      // Act
      const result = userSession.loadUser();

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(user);
    })
  });

  describe('UserSessionService', () => {
    it('should return the current value', () => {
      // Act
      userSession.UserSessionService.set(null);
      const result = userSession.UserSessionService.get();

      // Assert
      expect(result).toBeNull();
    });

    it('should set the expected value', () => {
      // Arrange
      const user: User = { name: 'test', organization: 'test', token: 'test' };

      // Act
      userSession.UserSessionService.set(user);
      const result = userSession.UserSessionService.get();

      // Assert
      expect(result).toEqual(user);
    });

    it('should remove the current value from localStorage ', () => {
      // Act
      userSession.UserSessionService.remove();
      const result = userSession.UserSessionService.get();

      // Assert
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });

    it('should save the user in the localStorage and update the current user', () => {
      // Arrange
      const user: User = { name: 'test1', organization: 'test1', token: 'test1' };

      // Act
      userSession.UserSessionService.save(user);
      const result = userSession.UserSessionService.get();

      // Assert
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result).toBe(user);
    });
  });
});
