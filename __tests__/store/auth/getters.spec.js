import MockDate from 'mockdate';
import { getters } from '@/store/auth';
import { parse } from 'date-fns';
import jwt from 'jsonwebtoken';

describe('Getters', () => {
  let params;
  let result;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    localStorage.clear();
    params = {
      state: {},
      getters: {},
      rootState: {},
      rootGetters: {}
    };
  });

  describe('when call getAccessToken', () => {
    beforeEach(() => {
      params.state = { accessToken: 'accessToken' };
      result = getters.getAccessToken(params.state);
    });

    it('returns access token', () => {
      expect(result).toEqual('accessToken');
    });
  });

  describe('when call getEmail', () => {
    beforeEach(() => {
      params.state = { id: 1, email: 'example@example.com' };
      result = getters.getEmail(params.state);
    });

    it('returns email', () => {
      expect(result).toEqual('example@example.com');
    });
  });

  describe('when call getUserId', () => {
    beforeEach(() => {
      params.state = { id: 1, email: 'example@example.com' };
      result = getters.getUserId(params.state);
    });

    it('returns id', () => {
      expect(result).toEqual(1);
    });
  });

  describe('when call isLoggedIn and user has token and client id', () => {
    beforeEach(() => {
      params.state = { refreshToken: 'refreshToken', clientId: 'clientId' };
      result = getters.isLoggedIn(params.state);
    });

    it('returns true', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call isLoggedIn and user does not has token', () => {
    beforeEach(() => {
      params.state = { refreshToken: '', clientId: '' };
      result = getters.isLoggedIn(params.state);
    });

    it('returns false', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken and token is valid', () => {
    beforeEach(() => {
      params.state = {
        accessToken: jwt.sign(
          { exp: parse('2019-02-01T00:00:00').getTime() / 1000 },
          'secret'
        )
      };
      result = getters.validateToken(params.state)();
    });

    it('returns truthy', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call validateToken but token expired', () => {
    beforeEach(() => {
      params.state = {
        accessToken: jwt.sign(
          { exp: parse('2018-12-31T00:00:00').getTime() / 1000 },
          'secret'
        )
      };
      result = getters.validateToken(params.state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken but user does not have token', () => {
    beforeEach(() => {
      params.state = { accessToken: '' };
      result = getters.validateToken(params.state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken but user have invalid token', () => {
    beforeEach(() => {
      params.state = { accessToken: 'invalid' };
      result = getters.validateToken(params.state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });
});
