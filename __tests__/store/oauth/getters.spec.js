import { getters } from '@/store/oauth';

describe('Getters', () => {
  let result;

  describe('when call getClient', () => {
    const state = { client: {} };

    beforeEach(() => {
      result = getters.getClient(state);
    });

    it('returns client', () => {
      expect(result).toEqual({});
    });
  });
});
