import { getters } from '~/store/oauth';

describe('Getters', () => {
  let result;

  describe('when call client', () => {
    const state = { client: {} };

    beforeEach(() => {
      result = getters.client(state);
    });

    it('returns client', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call decided', () => {
    const state = { decided: false };

    beforeEach(() => {
      result = getters.decided(state);
    });

    it('returns decided', () => {
      expect(result).toEqual(false);
    });
  });

  describe('when call redirectUri', () => {
    const state = { redirectUri: '' };

    beforeEach(() => {
      result = getters.redirectUri(state);
    });

    it('returns redirectUri', () => {
      expect(result).toEqual('');
    });
  });

  describe('when call redirectQuery', () => {
    const state = { redirectQuery: {} };

    beforeEach(() => {
      result = getters.redirectQuery(state);
    });

    it('returns redirectQuery', () => {
      expect(result).toEqual({});
    });
  });
});
