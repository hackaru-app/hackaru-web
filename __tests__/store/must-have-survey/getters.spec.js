import { getters } from '~/store/must-have-survey';

describe('Getters', () => {
  let result;

  describe('when call answerable', () => {
    const state = {
      answerable: true,
    };

    beforeEach(() => {
      result = getters.answerable(state);
    });

    it('returns answerable', () => {
      expect(result).toBe(true);
    });
  });
});
