import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '~/store/must-have-survey';

describe('Actions', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch fetchAnswerable', () => {
    const commit = jest.fn();

    beforeEach(async () => {
      mock
        .onGet('/v1/must_have_survey/answerable')
        .replyOnce(200, { answerable: true });
      await actions.fetchAnswerable({ commit });
    });

    it('commits SET_ANSWERABLE', () => {
      expect(commit).toHaveBeenCalledWith('SET_ANSWERABLE', true);
    });
  });

  describe('when dispatch answer', () => {
    let result;

    beforeEach(async () => {
      mock.onPost('/v1/must_have_survey').replyOnce(200);
      result = await actions.answer(undefined, {});
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });
});
