import { actions } from '@/store/activity-calendar';

describe('Actions', () => {
  describe('when dispatch createUrl', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        token: 'token',
        userId: 1,
      },
    }));

    beforeEach(() => {
      actions.createUrl({ dispatch, commit });
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activity_calendar',
          method: 'put',
        },
        { root: true }
      );
    });

    it('commits SET_TOKEN_AND_USER_ID', () => {
      expect(commit).toHaveBeenCalledWith('SET_TOKEN_AND_USER_ID', {
        token: 'token',
        userId: 1,
      });
    });
  });
});
