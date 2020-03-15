import { User } from '../../model/entities';

const loadUser = (): User | null => {
  try {
    const serializedToken = localStorage.getItem('user');
    if (!serializedToken) {
      return null;
    }
    return JSON.parse(serializedToken);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UserService = (() => {
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
