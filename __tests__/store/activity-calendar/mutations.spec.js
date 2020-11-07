import { mutations } from '@/store/activity-calendar';

describe('Mutations', () => {
  describe('when commit SET_TOKEN_AND_USER_ID', () => {
    const state = {
      baseUrl: '',
      token: '',
      userId: '',
    };

    beforeEach(() => {
      mutations.$config = { hackaruApiUrl: 'https://localhost' };
      mutations['SET_TOKEN_AND_USER_ID'](state, {
        token: 'token',
        userId: 1,
      });
    });

    it('sets token', () => {
      expect(state.token).toBe('token');
    });

    it('sets userId', () => {
      expect(state.userId).toBe(1);
    });

    it('sets baseUrl', () => {
      expect(state.baseUrl).toBe('webcal://localhost');
    });
  });
});
