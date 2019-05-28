import { actions } from '@/store/auth-api';

describe('Actions', () => {
  let result;

  describe('when user has valid access token', () => {
    const dispatch = jest.fn(() => ({ foo: 'bar' }));
    const rootGetters = {
      'auth/isLoggedIn': true,
      'auth/validateToken': () => true,
      'auth/getAccessToken': 'accessToken'
    };

    beforeEach(async () => {
      result = await actions.request(
        { dispatch, rootGetters },
        {
          url: '/example',
          method: 'post',
          headers: { 'X-Foo': 'bar' },
          params: {
            fooBar: 'baz'
          },
          data: {
            barBaz: 'baz'
          }
        }
      );
    });

    it('dispatch api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
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
    const rootGetters = {
      'auth/isLoggedIn': false
    };

    beforeEach(() => {
      result = actions.request({ rootGetters });
    });

    it('throw error with empty messsage', async () => {
      await expect(result).rejects.toThrowError(new Error(undefined));
    });
  });

  describe('when user does not have valid access token', () => {
    const dispatch = jest.fn();
    const rootGetters = {
      'auth/isLoggedIn': true,
      'auth/validateToken': () => false,
      'auth/getAccessToken': 'accessToken'
    };

    beforeEach(async () => {
      result = await actions.request(
        { dispatch, rootGetters },
        {
          url: '/example',
          method: 'post',
          data: {
            barBaz: 'baz'
          }
        }
      );
    });

    it('dispatch api/fetchAccessToken before request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth/fetchAccessToken',
        {},
        { root: true }
      );
    });

    it('dispatch api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
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
