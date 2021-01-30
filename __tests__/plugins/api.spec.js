import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createPlugin } from '@/plugins/api.js';

describe('Api', () => {
  let result;

  const context = {
    $config: {
      hackaruApiTimeout: 3000,
    },
    $axios: axios,
    store: {
      dispatch: jest.fn(),
      $i18n: {
        locale: 'en',
      },
    },
  };

  const plugin = createPlugin(context);
  const mock = new MockAdapter(plugin);

  beforeEach(() => {
    mock.reset();
  });

  describe('when request api', () => {
    beforeEach(async () => {
      mock.onPost('/example').replyOnce(200);
      await plugin.request({
        url: '/example',
        method: 'post',
        headers: { 'X-Foo': 'bar' },
        params: {
          fooBar: 'baz',
        },
        data: {
          barBaz: 'baz',
        },
      });
    });

    it('converts params to snakecase', () => {
      expect(mock.history.post[0].params).toEqual({ foo_bar: 'baz' });
    });

    it('converts data to snakecase', () => {
      expect(JSON.parse(mock.history.post[0].data)).toEqual({ bar_baz: 'baz' });
    });

    it('does not convert headers to snakecase', () => {
      expect(mock.history.post[0].headers['X-Foo']).toEqual('bar');
    });

    it('sends Accept-Language header', () => {
      expect(mock.history.post[0].headers['Accept-Language']).toEqual('en');
    });

    it('sends X-Requested-With header', () => {
      expect(mock.history.post[0].headers['X-Requested-With']).toEqual(
        'XMLHttpRequest'
      );
    });
  });

  describe('when content-type is json', () => {
    beforeEach(async () => {
      mock
        .onGet('/example')
        .replyOnce(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
      result = await plugin.request({
        url: '/example',
        responseType: 'json',
      });
    });

    it('converts response to camelcase', () => {
      expect(result.data.fooBar).toBe('baz');
      expect(result.data.foo.barBaz).toBe('foo');
    });
  });

  describe('when content-type is undefined', () => {
    beforeEach(async () => {
      mock
        .onGet('/example')
        .replyOnce(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
      result = await plugin.request({
        url: '/example',
      });
    });

    it('converts response to camelcase', () => {
      expect(result.data.fooBar).toBe('baz');
      expect(result.data.foo.barBaz).toBe('foo');
    });
  });

  describe('when response is error', () => {
    beforeEach(() => {
      mock
        .onGet('/example')
        .replyOnce(500, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
    });

    it('converts response to camelcase', () => {
      return plugin
        .request({
          url: '/example',
        })
        .catch((error) => {
          expect(error.response.data.fooBar).toBe('baz');
          expect(error.response.data.foo.barBaz).toBe('foo');
        });
    });
  });

  describe('when response is not 401 error', () => {
    const error = new Error();

    beforeEach(async () => {
      mock.onGet('/example').replyOnce(500, error);
      await plugin.request({
        url: '/example',
      });
    });

    it('dispatches toast/error', () => {
      expect(context.store.dispatch).toHaveBeenCalledWith(
        'toast/error',
        expect.any(Error)
      );
    });
  });

  describe('when response is 401 error', () => {
    beforeEach(async () => {
      mock.onGet('/example').replyOnce(401);
      await plugin.request({
        url: '/example',
      });
    });

    it('dispatches auth/forceLogout', () => {
      expect(context.store.dispatch).toHaveBeenCalledWith('auth/forceLogout');
    });
  });

  describe('when raise network error', () => {
    beforeEach(async () => {
      mock.onGet('/example').networkError();
      await plugin.request({
        url: '/example',
      });
    });

    it('dispatches toast/error', () => {
      expect(context.store.dispatch).toHaveBeenCalledWith(
        'toast/error',
        expect.any(Error)
      );
    });
  });

  describe('when raise timeout error', () => {
    beforeEach(async () => {
      mock.onGet('/example').timeoutOnce();
      await plugin.request({
        url: '/example',
      });
    });

    it('dispatches toast/error', () => {
      expect(context.store.dispatch).toHaveBeenCalledWith(
        'toast/error',
        expect.any(Error)
      );
    });
  });
});
