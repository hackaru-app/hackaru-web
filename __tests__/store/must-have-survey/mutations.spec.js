import { mutations } from '~/store/must-have-survey';

describe('Mutations', () => {
  describe('when commit SET_ANSWERABLE', () => {
    const state = {
      awnserable: false,
    };

    beforeEach(() => {
      mutations['SET_ANSWERABLE'](state, true);
    });

    it('sets answerable', () => {
      expect(state.answerable).toBe(true);
    });
  });
});
