import MockDate from 'mockdate';
import { getters } from '@/store/auth';
import { parse } from 'date-fns';
import jwt from 'jsonwebtoken';

describe('Getters', () => {
  let result;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when call getAccessToken', () => {
    const state = { accessToken: 'accessToken' };

    beforeEach(() => {
      result = getters.getAccessToken(state);
    });

    it('returns access token', () => {
      expect(result).toBe('accessToken');
    });
  });

  describe('when call getEmail', () => {
    const state = { id: 1, email: 'example@example.com' };

    beforeEach(() => {
      result = getters.getEmail(state);
    });

    it('returns email', () => {
      expect(result).toBe('example@example.com');
    });
  });

  describe('when call getUserId', () => {
    const state = { id: 1, email: 'example@example.com' };

    beforeEach(() => {
      result = getters.getUserId(state);
    });

    it('returns id', () => {
      expect(result).toEqual(1);
    });
  });

  describe('when call isLoggedIn', () => {
    const state = {
      refreshToken: 'refreshToken',
      clientId: 'clientId'
    };

    beforeEach(() => {
      result = getters.isLoggedIn(state);
    });

    it('returns true', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call isLoggedIn but user does not have token', () => {
    const state = {
      refreshToken: '',
      clientId: ''
    };

    beforeEach(() => {
      result = getters.isLoggedIn(state);
    });

    it('returns false', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken', () => {
    const exp = parse('2019-02-01T00:00:00').getTime() / 1000;
    const state = { accessToken: jwt.sign({ exp }, 'secret') };

    beforeEach(() => {
      result = getters.validateToken(state)();
    });

    it('returns truthy', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call validateToken but token expired', () => {
    const exp = parse('2018-12-31T00:00:00').getTime() / 1000;
    const state = { accessToken: jwt.sign({ exp }, 'secret') };

    beforeEach(() => {
      result = getters.validateToken(state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken but user does not have token', () => {
    const state = { accessToken: '' };

    beforeEach(() => {
      result = getters.validateToken(state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken but user have invalid token', () => {
    const state = { accessToken: 'invalid' };

    beforeEach(() => {
      result = getters.validateToken(state)();
    });

    it('returns falsy', () => {
      expect(result).toBeFalsy();
    });
  });
});
