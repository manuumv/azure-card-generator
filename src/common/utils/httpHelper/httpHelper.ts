import { headers } from './constants';
import { UserSessionService } from '../../services';
import { User } from '../../entities';

export const get = async <T>(endPoint: string): Promise<T> => request(endPoint, { headers, method: 'GET' });

export const request = async <T>(endPoint: string, requestInit: RequestInit): Promise<T> => {
  const response = await fetch(endPoint, getRequestInitWithAuthorization(requestInit, UserSessionService.get()));
  if (response.ok) {
    return response.status === 200 ? await response.json() : null;
  } else {
    throw new Error(response.statusText);
  }
}

export const getRequestInitWithAuthorization = (requestInit: RequestInit, user: User): RequestInit => (
  user?.token ?
    {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        Authorization: `Basic ${btoa(`${user.name}:${user.token}`)}`,
      }
    } :
    requestInit
);
