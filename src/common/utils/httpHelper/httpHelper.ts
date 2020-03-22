import { headers } from './constants';
import { UserSessionService } from '../../services/storage';
import { User } from '../../../model/entities';

export const get = async <T>(endPoint: string): Promise<T> => request(endPoint, { headers, method: 'GET' });

export const request = async <T>(endPoint: string, requestInit: RequestInit): Promise<T> => {
  const response = await fetch(endPoint, getRequestInitWithAuthorization(requestInit, UserSessionService.get()));
  if (response.ok) {
    if (response.status === 200) {
      return await response.json();
    }
    return null;
  } else {
    throw new Error(response.statusText);
  }
}

export const getRequestInitWithAuthorization = (requestInit: RequestInit, { token, name }: User): RequestInit => (
  token ?
    {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        Authorization: `Basic ${btoa(`${name}:${token}`)}`,
      }
    } :
    requestInit
);
