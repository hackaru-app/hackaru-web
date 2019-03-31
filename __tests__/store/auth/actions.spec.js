import { actions } from '@/store/auth';

describe('Actions', () => {
  let params;
  let result;

  beforeEach(() => {
    localStorage.clear();
    params = {
      state: {},
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch fetchRefreshToken', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        headers: {
          'x-refresh-token': 'refreshToken',
          'x-client-id': 'clientId'
        },
        data: {
          id: 1,
          email: 'example@example.com'
        }
      });
      result = await actions.fetchRefreshToken(params, {
        email: 'example@example.com',
        password: 'password'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/refresh_tokens',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com',
              password: 'password'
            }
          }
        },
        { root: true }
      );
    });

    it('commit SET_REFRESH_TOKEN', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_REFRESH_TOKEN', {
        refreshToken: 'refreshToken',
        clientId: 'clientId'
      });
    });

    it('commit SET_USER', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_USER', {
        id: 1,
        email: 'example@example.com'
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch fetchRefreshToken but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.fetchRefreshToken(params, {
        user: {
          email: 'example@example.com',
          password: 'password'
        }
      });
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch fetchAccessToken', () => {
    beforeEach(async () => {
      params.state = {
        clientId: 'clientId',
        refreshToken: 'refreshToken'
      };
      params.dispatch.mockReturnValueOnce({
        headers: {
          'x-access-token': 'accessToken'
        },
        data: {
          id: 1,
          email: 'example@example.com'
        }
      });
      result = await actions.fetchAccessToken(params);
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/access_tokens',
          method: 'post',
          headers: {
            'x-refresh-token': 'refreshToken',
            'x-client-id': 'clientId'
          }
        },
        { root: true }
      );
    });

    it('commit SET_ACCESS_TOKEN', () => {
      expect(params.commit).toHaveBeenCalledWith(
        'SET_ACCESS_TOKEN',
        'accessToken'
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch fetchAccessToken but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.fetchAccessToken(params, {
        user: {
          email: 'example@example.com',
          password: 'password'
        }
      });
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch signUp', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        headers: {
          'x-refresh-token': 'refreshToken',
          'x-client-id': 'clientId'
        },
        data: {
          id: 1,
          email: 'example@example.com'
        }
      });
      result = await actions.signUp(params, {
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/users',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation'
            }
          }
        },
        { root: true }
      );
    });

    it('commit SET_REFRESH_TOKEN', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_REFRESH_TOKEN', {
        refreshToken: 'refreshToken',
        clientId: 'clientId'
      });
    });

    it('commit SET_USER', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_USER', {
        id: 1,
        email: 'example@example.com'
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch signUp but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.signUp(params, {
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch changeEmail', () => {
    beforeEach(async () => {
      params.state = {
        user: {
          email: 'example@example.com'
        }
      };
      params.dispatch.mockReturnValueOnce({
        data: {
          id: 1,
          email: 'changed@example.com'
        }
      });
      result = await actions.changeEmail(params, {
        email: 'changed@example.com',
        currentPassword: 'password'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'put',
          data: {
            user: {
              email: 'changed@example.com',
              currentPassword: 'password'
            }
          }
        },
        { root: true }
      );
    });

    it('commit SET_USER', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_USER', {
        id: 1,
        email: 'changed@example.com'
      });
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch changeEmail but throw error', () => {
    beforeEach(async () => {
      params.state = {
        email: 'example@example.com'
      };
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.changeEmail(params, {
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch changePassword', () => {
    beforeEach(async () => {
      params.state = {
        email: 'example@example.com'
      };
      params.dispatch.mockReturnValueOnce({
        data: {
          id: 1,
          email: 'example@example.com'
        }
      });
      result = await actions.changePassword(params, {
        currentPassword: 'currentPassword',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'put',
          data: {
            user: {
              currentPassword: 'currentPassword',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation'
            }
          }
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch changePassword but throw error', () => {
    beforeEach(async () => {
      params.state = {
        email: 'example@example.com'
      };
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.changePassword(params, {
        currentPassword: 'currentPassword',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch sendPasswordResetEmail', () => {
    beforeEach(async () => {
      result = await actions.sendPasswordResetEmail(params, {
        email: 'example@example.com'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/password_reset/mails',
          method: 'post',
          data: {
            user: {
              email: 'example@example.com'
            }
          }
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch sendPasswordResetEmail but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.sendPasswordResetEmail(params, {
        email: 'example@example.com'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch resetPassword', () => {
    beforeEach(async () => {
      result = await actions.resetPassword(params, {
        token: 'passwordResetToken',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/password_reset',
          method: 'put',
          data: {
            user: {
              token: 'passwordResetToken',
              password: 'password',
              passwordConfirmation: 'passwordConfirmation'
            }
          }
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when dispatch resetPassword but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.resetPassword(params, {
        token: 'passwordResetToken',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when dispatch logout', () => {
    beforeEach(async () => {
      params.state = {
        clientId: 'clientId',
        refreshToken: 'refreshToken'
      };
      await actions.logout(params);
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/auth/refresh_token',
          method: 'delete',
          headers: {
            'x-client-id': 'clientId',
            'x-refresh-token': 'refreshToken'
          }
        },
        { root: true }
      );
    });

    it('commit CLEAR_TOKENS_AND_USER', () => {
      expect(params.commit).toHaveBeenCalledWith('CLEAR_TOKENS_AND_USER');
    });
  });

  describe('when dispatch deleteAccount', () => {
    beforeEach(async () => {
      result = await actions.deleteAccount(params, {
        currentPassword: 'currentPassword'
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/auth/user',
          method: 'delete',
          data: {
            user: {
              currentPassword: 'currentPassword'
            }
          }
        },
        { root: true }
      );
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
    it('commit CLEAR_TOKENS_AND_USER', () => {
      expect(params.commit).toHaveBeenCalledWith('CLEAR_TOKENS_AND_USER');
    });
  });

  describe('when dispatch deleteAccount but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.deleteAccount(params, {
        currentPassword: 'currentPassword'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns false', () => {
      expect(result).toBe(false);
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalled();
    });
  });
});
