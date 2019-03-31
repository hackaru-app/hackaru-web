import { mutations } from '@/store/auth';

describe('Mutations', () => {
  let state;

  describe('when commit SET_REFRESH_TOKEN', () => {
    beforeEach(() => {
      state = { refreshToken: '', clientId: '' };
      mutations['SET_REFRESH_TOKEN'](state, {
        refreshToken: 'refreshToken',
        clientId: 'clientId'
      });
    });

    it('set refresh token and client id', () => {
      expect(state.refreshToken).toBe('refreshToken');
      expect(state.clientId).toBe('clientId');
    });
  });

  describe('when commit SET_ACCESS_TOKEN', () => {
    beforeEach(() => {
      state = { accessToken: '' };
      mutations['SET_ACCESS_TOKEN'](state, 'accessToken');
    });

    it('set access token', () => {
      expect(state.accessToken).toBe('accessToken');
    });
  });

  describe('when commit SET_USER', () => {
    beforeEach(() => {
      state = { id: undefined, email: '' };
      mutations['SET_USER'](state, { id: 1, email: 'example@example.com' });
    });

    it('set user', () => {
      expect(state.id).toBe(1);
      expect(state.email).toBe('example@example.com');
    });
  });

  describe('when commit CLEAR_TOKENS_AND_USER', () => {
    beforeEach(() => {
      state = {
        id: 1,
        email: 'example@example.com',
        refreshToken: 'refreshToken',
        clientId: 'clientId',
        accessToken: 'accessToken'
      };
      mutations['CLEAR_TOKENS_AND_USER'](state);
    });

    it('clear state', () => {
      expect(state).toEqual({
        id: undefined,
        email: '',
        refreshToken: '',
        clientId: '',
        accessToken: ''
      });
    });
  });
});
