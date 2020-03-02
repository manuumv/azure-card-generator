import * as httpHelper from './httpHelper';
import { headers } from './constants';
import { MockParams } from 'jest-fetch-mock/types';

describe('httpHelper', () => {
  describe('request', () => {
    it('should return the expected response called with the given url and the expected header', () => {
      // Arrange
      const url = '/test';
      const requestInit: RequestInit = { headers };
      const expectedResult = { ok: true };
      const token = process.env.TOKEN;
      const response: MockParams = {
        status: 200,
        statusText: 'Accepted',
        headers: headers as { [key: string]: string },
      };
      const requestStub = jest.spyOn(httpHelper, 'request');
      const setAuthorizationHeaderStub = jest.spyOn(httpHelper, 'getRequestInitWithAuthorization');
      fetchMock.mockResponse(JSON.stringify(expectedResult), response);

      // Act
      httpHelper.request(url, requestInit)
        .then((response) => {
          // Assert
          expect(requestStub).toBeCalledWith(url, requestInit);
          expect(setAuthorizationHeaderStub).toBeCalledWith(requestInit, token);
          expect(fetchMock.mock.calls[0][1]['headers']).toEqual(requestInit.headers);
          expect(response).toEqual(expectedResult);
        });
    });

    it('should return the expected error', () => {
      // Arrange
      const url = '/test';
      const requestInit: RequestInit = { headers };
      const requestStub = jest.spyOn(httpHelper, 'request');
      const token = process.env.TOKEN;
      const setAuthorizationHeaderStub = jest.spyOn(httpHelper, 'getRequestInitWithAuthorization');
      const expectedResult = new Error('error');
      fetchMock.mockReject(expectedResult);

      // Act
      httpHelper.request(url, requestInit)
        .catch((response) => {
          // Assert
          expect(requestStub).toBeCalledWith(url, requestInit);
          expect(setAuthorizationHeaderStub).toBeCalledWith(requestInit, token);
          expect(fetchMock.mock.calls[0][1]['headers']).toEqual(requestInit.headers);
          expect(response).toEqual(expectedResult);
        });
    });
  });

  describe('get', () => {
    it('should called with the given endpoint and invoque request with the endpoint and the method as GET', () => {
      // Arrange
      const okResponse = JSON.stringify({ ok: true });
      const url = '/test'
      const getStub = jest.spyOn(httpHelper, 'get');
      const requestStub = jest.spyOn(httpHelper, 'request');
      const requestInit: RequestInit = { headers, method: 'GET' };
      fetchMock.mockResponse(okResponse);

      // Act
      httpHelper.get(url)
        .then((response) => {
          // Assert
          expect(getStub).toBeCalledWith(url);
          expect(requestStub).toBeCalledWith(url, requestInit);
          expect(response).toEqual(JSON.parse(okResponse));
        });
    });
  });

  describe('remove', () => {
    it('should called with the given endpoint and invoque request with the endpoint and the method as DELETE', () => {
      // Arrange
      const okResponse = JSON.stringify({ ok: true });
      const url = '/test'
      const removeStub = jest.spyOn(httpHelper, 'remove');
      const requestStub = jest.spyOn(httpHelper, 'request');
      const requestInit: RequestInit = { headers, method: 'DELETE' };
      fetchMock.mockResponse(okResponse);

      // Act
      httpHelper.remove(url)
        .then((response) => {
          // Assert
          expect(removeStub).toBeCalledWith(url);
          expect(requestStub).toBeCalledWith(url, requestInit);
          expect(response).toEqual(JSON.parse(okResponse));
        });
    });
  });

  describe('post', () => {
    it('should called with the given endpoint and invoque request with the endpoint and the method as POST', () => {
      // Arrange
      const okResponse = { ok: true };
      const url = '/test'
      const postStub = jest.spyOn(httpHelper, 'post');
      const requestStub = jest.spyOn(httpHelper, 'request');
      const requestInit: RequestInit = { headers, method: 'POST', body: JSON.stringify(okResponse) };
      const hasResponseContent = false;
      fetchMock.mockResponse(JSON.stringify(okResponse));

      // Act
      httpHelper.post(url, okResponse, hasResponseContent)
        .then((response) => {
          // Assert
          expect(postStub).toBeCalledWith(url, okResponse, hasResponseContent);
          expect(requestStub).toBeCalledWith(url, requestInit, hasResponseContent);
          expect(response).toEqual(okResponse);
        });
    });
  });

  describe('put', () => {
    it('should called with the given endpoint and invoque request with the endpoint and the method as PUT', () => {
      // Arrange
      const okResponse = { ok: true };
      const url = '/test';
      const removeStub = jest.spyOn(httpHelper, 'put');
      const requestStub = jest.spyOn(httpHelper, 'request');
      const requestInit: RequestInit = { headers, method: 'PUT', body: JSON.stringify(okResponse) };
      fetchMock.mockResponse(JSON.stringify(okResponse));

      // Act
      httpHelper.put(url, okResponse)
        .then((response) => {
          // Assert
          expect(removeStub).toBeCalledWith(url, okResponse);
          expect(requestStub).toBeCalledWith(url, requestInit);
          expect(response).toEqual(okResponse);
        });
    });
  });
});
