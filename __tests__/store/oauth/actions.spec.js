import { actions } from '@/store/oauth';

import snakecaseKeys from 'snakecase-keys';

describe('Actions', () => {
  let params;
  let result;

  beforeEach(() => {
    params = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('when dispatch getClient', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        data: {
          clientId: 'clientId',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          state: 'state',
          responseType: 'token',
          scope: 'activities:read projects:read',
          clientName: 'Example'
        }
      });
      result = await actions.getClient(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });

    it('commit SET_CLIENT', () => {
      expect(params.commit).toHaveBeenCalledWith('SET_CLIENT', {
        clientId: 'clientId',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        responseType: 'token',
        scope: 'activities:read projects:read',
        clientName: 'Example'
      });
    });
  });

  describe('when dispatch getClient but already authorized', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        data: {
          status: 'redirect',
          redirectUri:
            'http://example.com/callback#access_token=accessToken&token_type=Bearer'
        }
      });
      result = await actions.getClient(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          params: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'http://example.com/callback',
            scope: 'activities:read projects:read',
            state: 'state'
          }
        },
        { root: true }
      );
    });

    it('returns redirect uri', () => {
      expect(result).toBe(
        'http://example.com/callback#access_token=accessToken&token_type=Bearer'
      );
    });

    it('does not commit', () => {
      expect(params.commit).not.toHaveBeenCalledWith();
    });
  });

  describe('when dispatch getClient but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.getClient(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state'
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

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when dispatch allow', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        data: {
          status: 'redirect',
          redirectUri:
            'http://example.com/callback#access_token=accessToken&token_type=Bearer'
        }
      });
      result = await actions.allow(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'post',
          data: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'http://example.com/callback',
            scope: 'activities:read projects:read',
            state: 'state'
          }
        },
        { root: true }
      );
    });

    it('returns redirectUri', () => {
      expect(result).toBe(
        'http://example.com/callback#access_token=accessToken&token_type=Bearer'
      );
    });
  });

  describe('when dispatch allow and redirectUri is urn:ietf:wg:oauth:2.0:oob', () => {
    beforeEach(async () => {
      params.dispatch.mockReturnValueOnce({
        data: {
          status: 'redirect',
          redirectUri: {
            controller: 'doorkeeper/token_info',
            action: 'show',
            accessToken: 'accessToken'
          }
        }
      });
      result = await actions.allow(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('returns redirectUri object', () => {
      expect(result).toEqual({
        controller: 'doorkeeper/token_info',
        action: 'show',
        accessToken: 'accessToken'
      });
    });
  });

  describe('when dispatch allow but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.allow(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when dispatch deny', () => {
    beforeEach(async () => {
      const error = new Error();
      error.status = '401';
      error.response = {
        data: snakecaseKeys({
          status: 'redirect',
          redirectUri:
            'http://example.com/callback#error=access_denied&error_description=denied'
        })
      };
      params.dispatch.mockRejectedValueOnce(error);
      result = await actions.deny(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('dispatch auth-api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'delete',
          data: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'http://example.com/callback',
            scope: 'activities:read projects:read',
            state: 'state'
          }
        },
        { root: true }
      );
    });

    it('returns redirectUri', () => {
      expect(result).toBe(
        'http://example.com/callback#error=access_denied&error_description=denied'
      );
    });
  });

  describe('when dispatch deny and redirectUri is urn:ietf:wg:oauth:2.0:oob', () => {
    beforeEach(async () => {
      const error = new Error('error');
      error.status = '401';
      error.response = {
        data: snakecaseKeys({
          error: 'access_denied',
          errorDescription: 'denied'
        })
      };
      params.dispatch.mockRejectedValueOnce(error);
      result = await actions.deny(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('returns error description', () => {
      expect(result).toEqual({
        errorDescription: 'denied'
      });
    });
  });

  describe('when dispatch deny but throw error', () => {
    beforeEach(async () => {
      params.dispatch.mockRejectedValueOnce(new Error('error'));
      result = await actions.deny(params, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state'
      });
    });

    it('dispatch toast/error', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'toast/error',
        new Error('error'),
        { root: true }
      );
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });
});
