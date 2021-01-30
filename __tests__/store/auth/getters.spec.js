import MockDate from 'mockdate';
import { getters } from '@/store/auth';

describe('Getters', () => {
  let result;

  MockDate.set('2019-01-31T01:23:45');

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when call email', () => {
    const state = { email: 'example@example.com' };

    beforeEach(() => {
      result = getters.email(state);
    });

    it('returns email', () => {
      expect(result).toBe('example@example.com');
    });
  });

  describe('when call userId', () => {
    const state = { id: 1 };

    beforeEach(() => {
      result = getters.userId(state);
    });

    it('returns id', () => {
      expect(result).toEqual(1);
    });
  });

  describe('when call loggedIn', () => {
    const state = { loggedIn: true };

    beforeEach(() => {
      result = getters.loggedIn(state);
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });
});
