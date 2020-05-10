import { mutations } from '@/store/auth';

describe('Mutations', () => {
  describe('when commit SET_REFRESH_TOKEN', () => {
    const state = { refreshToken: '', clientId: '' };

    beforeEach(() => {
      mutations['SET_REFRESH_TOKEN'](state, {
        refreshToken: 'refreshToken',
        clientId: 'clientId',
      });
    });

    it('set refresh token and client id', () => {
      expect(state.refreshToken).toBe('refreshToken');
      expect(state.clientId).toBe('clientId');
    });
  });

  describe('when commit SET_ACCESS_TOKEN', () => {
    const state = { accessToken: '' };

    beforeEach(() => {
      mutations['SET_ACCESS_TOKEN'](state, 'accessToken');
    });

    it('set access token', () => {
      expect(state.accessToken).toBe('accessToken');
    });
  });

  describe('when commit SET_ID_AND_EMAIL', () => {
    const state = { id: undefined, email: '' };

    beforeEach(() => {
      mutations['SET_ID_AND_EMAIL'](state, {
        id: 1,
        email: 'example@example.com',
      });
    });

    it('set user', () => {
      expect(state.id).toBe(1);
      expect(state.email).toBe('example@example.com');
    });
  });

  describe('when commit CLEAR_TOKENS', () => {
    const state = {
      id: 1,
      email: 'example@example.com',
      refreshToken: 'refreshToken',
      clientId: 'clientId',
      accessToken: 'accessToken',
    };

    beforeEach(() => {
      mutations['CLEAR_TOKENS'](state);
    });

    it('clear state', () => {
      expect(state).toEqual({
        id: undefined,
        email: '',
        refreshToken: '',
        clientId: '',
        accessToken: '',
      });
    });
  });
});
