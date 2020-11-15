import { actions } from '@/store/auth';

describe('Actions', () => {
  let result;

  Intl.DateTimeFormat = () => ({
    resolvedOptions: () => ({
      timeZone: 'America/New_York',
    }),
  });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when dispatch fetchRefreshToken', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      headers: {
        'x-refresh-token': 'refreshToken',
        'x-client-id': 'clientId',
      },
      data: {
        id: 1,
        email: 'example@example.com',
      },
    }));

    beforeEach(async () => {
      result = await actions.fetchRefreshToken(
        { commit, dispatch },
        {
          email: 'example@example.com',
          password: 'password',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/refresh_tokens',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com',
              password: 'password',
            },
          },
        },
        { root: true }
      );
    });

    it('commits SET_REFRESH_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_REFRESH_TOKEN', {
        refreshToken: 'refreshToken',
        clientId: 'clientId',
      });
    });

    it('commits SET_ID_AND_EMAIL', () => {
      expect(commit).toHaveBeenCalledWith('SET_ID_AND_EMAIL', {
        id: 1,
        email: 'example@example.com',
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch fetchAccessToken', () => {
    const state = {
      clientId: 'clientId',
      refreshToken: 'refreshToken',
    };

    const commit = jest.fn();

    const dispatch = jest.fn(() => ({
      headers: {
        'x-access-token': 'accessToken',
      },
      data: {
        id: 1,
        email: 'example@example.com',
      },
    }));

    beforeEach(async () => {
      result = await actions.fetchAccessToken({ state, commit, dispatch });
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/access_tokens',
          method: 'post',
          headers: {
            'x-refresh-token': 'refreshToken',
            'x-client-id': 'clientId',
          },
        },
        { root: true }
      );
    });

    it('commits SET_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', 'accessToken');
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch signUp', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      headers: {
        'x-refresh-token': 'refreshToken',
        'x-client-id': 'clientId',
      },
      data: {
        id: 1,
        email: 'example@example.com',
      },
    }));

    beforeEach(async () => {
      result = await actions.signUp(
        { dispatch, commit },
        {
          email: 'example@example.com',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/users',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation',
              timeZone: 'America/New_York',
            },
          },
        },
        { root: true }
      );
    });

    it('commits SET_REFRESH_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_REFRESH_TOKEN', {
        refreshToken: 'refreshToken',
        clientId: 'clientId',
      });
    });

    it('commits SET_ID_AND_EMAIL', () => {
      expect(commit).toHaveBeenCalledWith('SET_ID_AND_EMAIL', {
        id: 1,
        email: 'example@example.com',
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch changeEmail', () => {
    const state = {
      user: {
        email: 'example@example.com',
      },
    };

    const commit = jest.fn();

    const dispatch = jest.fn(() => ({
      data: {
        id: 1,
        email: 'changed@example.com',
      },
    }));

    beforeEach(async () => {
      result = await actions.changeEmail(
        { state, dispatch, commit },
        {
          email: 'changed@example.com',
          currentPassword: 'password',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'put',
          data: {
            user: {
              email: 'changed@example.com',
              currentPassword: 'password',
            },
          },
        },
        { root: true }
      );
    });

    it('commits SET_ID_AND_EMAIL', () => {
      expect(commit).toHaveBeenCalledWith('SET_ID_AND_EMAIL', {
        id: 1,
        email: 'changed@example.com',
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch changePassword', () => {
    const state = {
      email: 'example@example.com',
    };

    const dispatch = jest.fn(() => ({
      data: {
        id: 1,
        email: 'example@example.com',
      },
    }));

    beforeEach(async () => {
      result = await actions.changePassword(
        { state, dispatch },
        {
          currentPassword: 'currentPassword',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'put',
          data: {
            user: {
              currentPassword: 'currentPassword',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation',
            },
          },
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch sendPasswordResetEmail', () => {
    const dispatch = jest.fn();

    beforeEach(async () => {
      result = await actions.sendPasswordResetEmail(
        { dispatch },
        {
          email: 'example@example.com',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/password_reset/mails',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com',
            },
          },
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch resetPassword', () => {
    const dispatch = jest.fn();

    beforeEach(async () => {
      result = await actions.resetPassword(
        { dispatch },
        {
          token: 'passwordResetToken',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/password_reset',
          method: 'put',
          data: {
            user: {
              token: 'passwordResetToken',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation',
            },
          },
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch logout', () => {
    const state = {
      clientId: 'clientId',
      refreshToken: 'refreshToken',
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    beforeEach(async () => {
      await actions.logout({ state, dispatch, commit });
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/refresh_token',
          method: 'delete',
          headers: {
            'x-client-id': 'clientId',
            'x-refresh-token': 'refreshToken',
          },
        },
        { root: true }
      );
    });

    it('commits CLEAR_TOKENS', () => {
      expect(commit).toHaveBeenCalledWith('CLEAR_TOKENS');
    });
  });

  describe('when dispatch deleteAccount', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    beforeEach(async () => {
      result = await actions.deleteAccount(
        { dispatch, commit },
        {
          currentPassword: 'currentPassword',
        }
      );
    });

    it('dispatches api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'delete',
          data: {
            user: {
              currentPassword: 'currentPassword',
            },
          },
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
    it('commits CLEAR_TOKENS', () => {
      expect(commit).toHaveBeenCalledWith('CLEAR_TOKENS');
    });
  });
});
