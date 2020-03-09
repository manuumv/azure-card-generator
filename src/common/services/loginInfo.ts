import { AccountInfo } from '../../model/entities';

const get = (): AccountInfo => {
  try {
    const value = localStorage.getItem('accountInfo');
    const parsedValue: AccountInfo = JSON.parse(value);
    return parsedValue;
  } catch (error) {
    console.log(error);
  }
}

const set = (loginInfo: AccountInfo) => {
  try {
    localStorage.setItem('accountInfo', JSON.stringify(loginInfo));
  } catch (error) {
    console.log(error);
  }
}

const remove = () => {
  try {
    localStorage.removeItem('accountInfo');
  } catch (error) {
    console.log(error);
  }
}

export const localStorageAccountInfo = { get, set, remove };
