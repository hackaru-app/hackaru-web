import { getters } from '@/store/oauth';

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
});
