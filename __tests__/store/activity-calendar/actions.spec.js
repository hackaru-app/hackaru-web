import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '~/store/activity-calendar';

describe('Actions', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch createUrl', () => {
    const commit = jest.fn();

    beforeEach(() => {
      mock.onPut('/v1/activity_calendar').replyOnce(200, {});
      actions.createUrl({ commit });
    });

    it('commits SET_TOKEN_AND_USER_ID', () => {
      expect(commit).toHaveBeenCalledWith('SET_TOKEN_AND_USER_ID', {});
    });
  });
});
