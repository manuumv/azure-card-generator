import * as httpHelper from './httpHelper';
import { headers } from './constants';
import { MockParams } from 'jest-fetch-mock/types';
import { UserSessionService } from '../../services/storage';
import { User } from '../../../model/entities';

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
      const spyRequest = jest.spyOn(httpHelper, 'request');
      const spyGetRequestInitWithAuthorization = jest.spyOn(httpHelper, 'getRequestInitWithAuthorization').mockReturnValue(requestInit);
      const mockedUser: User = { name: 'name', organization: 'organization', token: 'token' };
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get').mockReturnValue(mockedUser);
      const expectedResult = new Error('error');
      fetchMock.mockReject(expectedResult);

      // Act
      httpHelper.request(url, requestInit)
        .catch((response) => {
          // Assert
          expect(spyRequest).toBeCalledWith(url, requestInit);
          expect(spyUserSessionServiceGet).toHaveBeenCalled();
          expect(spyGetRequestInitWithAuthorization).toBeCalledWith(requestInit, mockedUser);
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
      const requestInit: RequestInit = { headers, method: 'GET' };
      const spyGetRequestInitWithAuthorization = jest.spyOn(httpHelper, 'getRequestInitWithAuthorization').mockReturnValue(requestInit);
      const spyRequest = jest.spyOn(httpHelper, 'request');
      const mockedUser: User = { name: 'name', organization: 'organization', token: 'token' };
      const spyUserSessionServiceGet = jest.spyOn(UserSessionService, 'get').mockReturnValue(mockedUser);
      fetchMock.mockResponse(okResponse);

      // Act
      httpHelper.get(url)
        .then((response) => {
          // Assert
          expect(getStub).toBeCalledWith(url);
          expect(spyUserSessionServiceGet).toHaveBeenCalled();
          expect(spyGetRequestInitWithAuthorization).toBeCalledWith(requestInit, mockedUser);
          expect(spyRequest).toBeCalledWith(url, requestInit);
          expect(response).toEqual(JSON.parse(okResponse));
        });
    });
  });
});
