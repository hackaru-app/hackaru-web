import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/oauth';

describe('Actions', () => {
  let result;

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$api = axios;
  });

  describe('when dispatch fetchClient', () => {
    const commit = jest.fn();

    beforeEach(async () => {
      mock.onGet('/v1/oauth/authorize').replyOnce(200, {
        clientId: 'clientId',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        responseType: 'token',
        scope: 'activities:read projects:read',
        clientName: 'Example',
      });
      result = await actions.fetchClient(
        { commit },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('commits SET_CLIENT', () => {
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

    beforeEach(async () => {
      mock.onGet('/v1/oauth/authorize').replyOnce(200, {
        status: 'redirect',
        redirectUri:
          'http://example.com/callback#access_token=token&token_type=Bearer',
      });
      result = await actions.fetchClient(
        { commit },
        {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri:
            'http://example.com/callback#access_token=token&token_type=Bearer',
          scope: 'activities:read projects:read',
          state: 'state',
        }
      );
    });

    it('does not commit', () => {
      expect(commit).not.toHaveBeenCalled();
    });

    it('returns redirect uri', () => {
      expect(result).toBe(
        'http://example.com/callback#access_token=token&token_type=Bearer'
      );
    });
  });

  describe('when dispatch allow', () => {
    beforeEach(async () => {
      mock
        .onPost('/v1/oauth/authorize', {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        })
        .replyOnce(200, {
          status: 'redirect',
          redirectUri:
            'http://example.com/callback#access_token=token&token_type=Bearer',
        });
      result = await actions.allow(undefined, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state',
      });
    });

    it('returns redirectUri', () => {
      expect(result).toBe(
        'http://example.com/callback#access_token=token&token_type=Bearer'
      );
    });
  });

  describe('when dispatch allow and redirectUri is urn:ietf:wg:oauth:2.0:oob', () => {
    beforeEach(async () => {
      mock
        .onPost('/v1/oauth/authorize', {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scope: 'activities:read projects:read',
          state: 'state',
        })
        .replyOnce(200, {
          status: 'redirect',
          redirectUri: {
            controller: 'doorkeeper/token_info',
            action: 'show',
            token: 'token',
          },
        });
      result = await actions.allow(undefined, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state',
      });
    });

    it('returns redirectUri object', () => {
      expect(result).toEqual({
        controller: 'doorkeeper/token_info',
        action: 'show',
        token: 'token',
      });
    });
  });

  describe('when dispatch deny', () => {
    beforeEach(async () => {
      mock
        .onDelete('/v1/oauth/authorize', {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        })
        .replyOnce(400, {
          status: 'redirect',
          redirectUri:
            'http://example.com/callback#error=access_denied&error_description=denied',
        });
      result = await actions.deny(undefined, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'http://example.com/callback',
        scope: 'activities:read projects:read',
        state: 'state',
      });
    });

    it('returns redirectUri', () => {
      expect(result).toBe(
        'http://example.com/callback#error=access_denied&error_description=denied'
      );
    });
  });

  describe('when dispatch deny and redirectUri is urn:ietf:wg:oauth:2.0:oob', () => {
    beforeEach(async () => {
      mock
        .onDelete('/v1/oauth/authorize', {
          clientId: 'clientId',
          responseType: 'token',
          redirectUri: 'http://example.com/callback',
          scope: 'activities:read projects:read',
          state: 'state',
        })
        .replyOnce(400, {
          error: 'access_denied',
          errorDescription: 'denied',
        });
      result = await actions.deny(undefined, {
        clientId: 'clientId',
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        scope: 'activities:read projects:read',
        state: 'state',
      });
    });

    it('returns error description', () => {
      expect(result).toEqual({
        errorDescription: 'denied',
      });
    });
  });
});
