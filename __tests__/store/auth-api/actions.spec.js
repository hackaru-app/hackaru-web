import { actions } from '@/store/auth-api';

describe('Actions', () => {
  let params;
  let result;

  beforeEach(() => {
    params = {
      dispatch: {},
      rootGetters: {}
    };
  });

  describe('when user has valid access token', () => {
    beforeEach(async () => {
      params.dispatch = jest.fn(() => ({
        foo: 'bar'
      }));
      params.rootGetters = {
        'auth/isLoggedIn': true,
        'auth/validateToken': () => true,
        'auth/getAccessToken': 'accessToken'
      };
      result = await actions.request(params, {
        url: '/example',
        method: 'post',
        headers: { 'X-Foo': 'bar' },
        params: {
          fooBar: 'baz'
        },
        data: {
          barBaz: 'baz'
        }
      });
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/example',
          method: 'post',
          headers: {
            'X-Foo': 'bar',
            'x-access-token': 'accessToken'
          },
          params: {
            fooBar: 'baz'
          },
          data: {
            barBaz: 'baz'
          }
        },
        { root: true }
      );
    });

    it('returns response', () => {
      expect(result).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      params.rootGetters = {
        'auth/isLoggedIn': false
      };
      result = actions.request(params);
    });

    it('throw error', async () => {
      await expect(result).rejects.toThrowError(new Error(undefined));
    });
  });

  describe('when user does not have valid access token', () => {
    beforeEach(async () => {
      params.dispatch = jest.fn();
      params.rootGetters = {
        'auth/isLoggedIn': true,
        'auth/validateToken': () => false,
        'auth/getAccessToken': 'accessToken'
      };
      result = await actions.request(params, {
        url: '/example',
        method: 'post',
        data: {
          barBaz: 'baz'
        }
      });
    });

    it('dispatch api/fetchAccessToken', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'auth/fetchAccessToken',
        null,
        { root: true }
      );
    });

    it('dispatch api/request', () => {
      expect(params.dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/example',
          method: 'post',
          headers: {
            'x-access-token': 'accessToken'
          },
          data: {
            barBaz: 'baz'
          }
        },
        { root: true }
      );
    });
  });
});
