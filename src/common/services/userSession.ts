import { User } from '../entities';

export const loadUser = (): User | null => {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UserSessionService = (() => {
  let user = loadUser();

  const remove = () => {
    try {
      localStorage.removeItem('user');
      user = null;
    } catch (error) { console.log(error); };
  };

  const set = (newUser: User) => user = newUser;

  const save = (newUser: User) => {
    try {
      user = newUser;
      localStorage.setItem('user', JSON.stringify(newUser))
    } catch (error) {
      console.log(error);
    }
  };

  const get = (): User => user;

  return {
    set,
    get,
    remove,
    save
  }
})();
