import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createPlugin } from '~/plugins/api.js';

describe('Api', () => {
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
    beforeEach(() => {
      mock
        .onGet('/example')
        .replyOnce(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
    });

    it('converts response to camelcase', async () => {
      const result = await plugin.request({
        url: '/example',
        responseType: 'json',
      });
      expect(result.data.fooBar).toBe('baz');
      expect(result.data.foo.barBaz).toBe('foo');
    });
  });

  describe('when content-type is undefined', () => {
    beforeEach(() => {
      mock
        .onGet('/example')
        .replyOnce(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
    });

    it('converts response to camelcase', async () => {
      const result = await plugin.request({
        url: '/example',
      });
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

    it('converts response to camelcase', async () => {
      await plugin
        .request({
          url: '/example',
        })
        .catch((e) => {
          expect(e.response.data.fooBar).toBe('baz');
          expect(e.response.data.foo.barBaz).toBe('foo');
        });
    });
  });

  describe('when response is not 401 error', () => {
    beforeEach(() => {
      mock.onGet('/example').replyOnce(500);
    });

    it('throws error', (done) => {
      plugin.request({ url: '/example' }).catch(() => done());
    });

    it('dispatches toast/error', () => {
      plugin
        .request({ url: '/example' })
        .catch((e) =>
          expect(context.store.dispatch).toHaveBeenCalledWith('toast/error', e)
        );
    });
  });

  describe('when response is 401 error', () => {
    beforeEach(() => {
      mock.onGet('/example').replyOnce(401);
    });

    it('does not throw error', () => {
      expect(plugin.request({ url: '/example' })).resolves.not.toThrow();
    });

    it('dispatches auth/forceLogout', async () => {
      await plugin.request({ url: '/example' });
      expect(context.store.dispatch).toHaveBeenCalledWith('auth/forceLogout');
    });
  });

  describe('when raise network error', () => {
    beforeEach(() => {
      mock.onGet('/example').networkError();
    });

    it('throws error', (done) => {
      plugin.request({ url: '/example' }).catch(() => done());
    });

    it('dispatches toast/error', async () => {
      try {
        await plugin.request({ url: '/example' });
      } catch (e) {
        expect(context.store.dispatch).toHaveBeenCalledWith('toast/error', e);
      }
    });
  });

  describe('when raise timeout error', () => {
    beforeEach(() => {
      mock.onGet('/example').timeoutOnce();
    });

    it('throws error', (done) => {
      plugin.request({ url: '/example' }).catch(() => done());
    });

    it('dispatches toast/error', () => {
      plugin
        .request({ url: '/example' })
        .catch((e) =>
          expect(context.store.dispatch).toHaveBeenCalledWith('toast/error', e)
        );
    });
  });
});
