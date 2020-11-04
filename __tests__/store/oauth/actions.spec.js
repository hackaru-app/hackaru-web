import { actions } from '@/store/oauth';

describe('Actions', () => {
  let result;

  describe('when dispatch fetchClient', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        clientId: 'clientId',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        responseType: 'token',
        scope: 'activities:read projects:read',
        clientName: 'Example',
      },
    }));

    beforeEach(async () => {
      result = await actions.fetchClient(
        { dispatch, commit },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          params: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
            scope: 'activities:read projects:read',
            state: 'state',
          },
        },
        { root: true }
      );
    });

    it('commit SET_CLIENT', () => {
      expect(commit).toHaveBeenCalledWith('SET_CLIENT', {
        clientId: 'clientId',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        responseType: 'token',
        scope: 'activities:read projects:read',
        clientName: 'Example',
      });
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when dispatch fetchClient but already authorized', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({
      data: {
        status: 'redirect',
        redirectUri:
          'http://example.com/callback#access_token=accessToken&token_type=Bearer',
      },
    }));

    beforeEach(async () => {
      result = await actions.fetchClient(
        { dispatch, commit },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('returns redirect uri', () => {
      expect(result).toBe(
        'http://example.com/callback#access_token=accessToken&token_type=Bearer'
      );
    });

    it('does not commit', () => {
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('when dispatch fetchClient but throw error', () => {
    const dispatch = jest.fn().mockRejectedValueOnce(new Error('error'));

    beforeEach(async () => {
      result = await actions.fetchClient(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when dispatch allow', () => {
    const dispatch = jest.fn(() => ({
      data: {
        status: 'redirect',
        redirectUri:
          'http://example.com/callback#access_token=accessToken&token_type=Bearer',
      },
    }));

    beforeEach(async () => {
      result = await actions.allow(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'post',
          data: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'http://example.com/callback',
            scope: 'activities:read projects:read',
            state: 'state',
          },
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
    const dispatch = jest.fn(() => ({
      data: {
        status: 'redirect',
        redirectUri: {
          controller: 'doorkeeper/token_info',
          action: 'show',
          accessToken: 'accessToken',
        },
      },
    }));

    beforeEach(async () => {
      result = await actions.allow(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('returns redirectUri object', () => {
      expect(result).toEqual({
        controller: 'doorkeeper/token_info',
        action: 'show',
        accessToken: 'accessToken',
      });
    });
  });

  describe('when dispatch allow but throw error', () => {
    const dispatch = jest.fn().mockRejectedValueOnce(new Error('error'));

    beforeEach(async () => {
      result = await actions.allow(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when dispatch deny', () => {
    const dispatch = jest.fn(() => {
      const error = new Error();
      error.status = '401';
      error.response = {
        data: {
          status: 'redirect',
          redirect_uri:
            'http://example.com/callback#error=access_denied&error_description=denied',
        },
      };
      throw error;
    });

    beforeEach(async () => {
      result = await actions.deny(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('dispatches auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/oauth/authorize',
          method: 'delete',
          data: {
            clientId: 'clientId',
            responseType: 'token',
            redirectUri: 'http://example.com/callback',
            scope: 'activities:read projects:read',
            state: 'state',
          },
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
    const dispatch = jest.fn(() => {
      const error = new Error();
      error.status = '401';
      error.response = {
        data: {
          error: 'access_denied',
          error_description: 'denied',
        },
      };
      throw error;
    });

    beforeEach(async () => {
      result = await actions.deny(
        { dispatch },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('returns error description', () => {
      expect(result).toEqual({
        errorDescription: 'denied',
      });
    });
  });
});
