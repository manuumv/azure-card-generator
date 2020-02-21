import { headers } from './constants';

export const get = async <T>(endPoint: string): Promise<T> => request(endPoint, { headers, method: 'GET' });

export const put = async <T>(endPoint: string, bodyObject: object): Promise<T> => (
  request(endPoint, { headers, method: 'PUT', body: JSON.stringify(bodyObject) })
);

export const remove = <T>(endPoint: string): Promise<T> => (
  request(endPoint, { method: 'DELETE', headers })
);

export const post = <T>(endPoint: string, bodyObject: object, hasResponseContent?: boolean): Promise<T> => (
  request(endPoint, { method: 'POST', headers, body: JSON.stringify(bodyObject) }, hasResponseContent)
);

export const request = async <T>(endPoint: string, requestInit: RequestInit, hasResponseContent?: boolean): Promise<T> => {
  const response = await fetch(endPoint, getRequestInitWithAuthorization(requestInit, process.env.TOKEN));

  if (response.ok) {
    if (hasResponseContent || response.status === 200) {
      return await response.json();
    }
    return null;
  } else {
    throw new Error(response.statusText);
  }
}

export const getRequestInitWithAuthorization = (requestInit: RequestInit, token?: string): RequestInit => (
  token ?
    {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        Authorization: authorization,
      }
    } :
    requestInit
);

const authorization = `Basic ${btoa(`${process.env.USERNAME}:${process.env.TOKEN}`)}`

