import { mutations } from '@/store/activity-calendar';

describe('Mutations', () => {
  describe('when commit SET_TOKEN_AND_USER_ID', () => {
    const state = {
      baseUrl: '',
      token: '',
      userId: '',
    };

    beforeEach(() => {
      mutations.$env = { HACKARU_API_URL: 'https://localhost' };
      mutations['SET_TOKEN_AND_USER_ID'](state, {
        token: 'token',
        userId: 1,
      });
    });

    it('set token', () => {
      expect(state.token).toBe('token');
    });

    it('set userId', () => {
      expect(state.userId).toBe(1);
    });

    it('set baseUrl', () => {
      expect(state.baseUrl).toBe('webcal://localhost');
    });
  });
});
