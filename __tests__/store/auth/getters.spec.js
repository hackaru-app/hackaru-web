import MockDate from 'mockdate';
import { getters } from '@/store/auth';
import { parseISO } from 'date-fns';
import jwt from 'jsonwebtoken';

describe('Getters', () => {
  let result;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when call accessToken', () => {
    const state = { accessToken: 'accessToken' };

    beforeEach(() => {
      result = getters.accessToken(state);
    });

    it('returns access token', () => {
      expect(result).toBe('accessToken');
    });
  });

  describe('when call email', () => {
    const state = { id: 1, email: 'example@example.com' };

    beforeEach(() => {
      result = getters.email(state);
    });

    it('returns email', () => {
      expect(result).toBe('example@example.com');
    });
  });

  describe('when call userId', () => {
    const state = { id: 1, email: 'example@example.com' };

    beforeEach(() => {
      result = getters.userId(state);
    });

    it('returns id', () => {
      expect(result).toEqual(1);
    });
  });

  describe('when call loggedIn', () => {
    const state = {
      refreshToken: 'refreshToken',
      clientId: 'clientId'
    };

    beforeEach(() => {
      result = getters.loggedIn(state);
    });

    it('returns true', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call loggedIn but user does not have token', () => {
    const state = {
      refreshToken: '',
      clientId: ''
    };

    beforeEach(() => {
      result = getters.loggedIn(state);
    });

    it('returns false', () => {
      expect(result).toBeFalsy();
    });
  });

  describe('when call validateToken', () => {
    const exp = parseISO('2019-02-01T00:00:00').getTime() / 1000;
    const state = { accessToken: jwt.sign({ exp }, 'secret') };

    beforeEach(() => {
      result = getters.validateToken(state)();
    });

    it('returns truthy', () => {
      expect(result).toBeTruthy();
    });
  });

  describe('when call validateToken but token expired', () => {
    const exp = parseISO('2018-12-31T00:00:00').getTime() / 1000;
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
