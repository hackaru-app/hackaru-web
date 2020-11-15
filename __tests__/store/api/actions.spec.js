import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/api';
import translations from '@/assets/locales/store/api.json';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

describe('Actions', () => {
  let result;

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$axios = axios;
    actions.$config = { hackaruApiTimeout: 0 };
    actions.$i18n = new VueI18n({ locale: 'en', messages: translations });
  });

  describe('when dispatch request', () => {
    beforeEach(async () => {
      mock.onPost('/example').replyOnce(200);
      await actions.request(
        {},
        {
          url: '/example',
          method: 'post',
          headers: { 'X-Foo': 'bar' },
          params: {
            fooBar: 'baz',
          },
          data: {
            barBaz: 'baz',
          },
        }
      );
    });

    it('convert params to snakecase', () => {
      expect(mock.history.post[0].params).toEqual({ foo_bar: 'baz' });
    });

    it('convert data to snakecase', () => {
      expect(JSON.parse(mock.history.post[0].data)).toEqual({ bar_baz: 'baz' });
    });

    it('send headers', () => {
      expect(mock.history.post[0].headers['X-Foo']).toEqual('bar');
    });

    it('send Accept-Language headers', () => {
      expect(mock.history.post[0].headers['Accept-Language']).toEqual('en');
    });
  });

  describe('when content-type is json', () => {
    beforeEach(async () => {
      mock
        .onGet('/example')
        .reply(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
      result = await actions.request(
        {},
        {
          url: '/example',
          responseType: 'json',
        }
      );
    });

    it('convert response to camelcase', () => {
      expect(result.data.fooBar).toBe('baz');
      expect(result.data.foo.barBaz).toBe('foo');
    });
  });

  describe('when content-type is undefined', () => {
    beforeEach(async () => {
      mock
        .onGet('/example')
        .reply(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
      result = await actions.request(
        {},
        {
          url: '/example',
        }
      );
    });

    it('convert response to camelcase', () => {
      expect(result.data.fooBar).toBe('baz');
      expect(result.data.foo.barBaz).toBe('foo');
    });
  });

  describe('when response data is empty', () => {
    beforeEach(async () => {
      mock.onGet('/example').reply(200, {});
      result = await actions.request({}, { url: '/example' });
    });

    it('returns empty data', () => {
      expect(result.data).toEqual({});
    });
  });

  describe('when raise network error', () => {
    beforeEach(() => {
      mock.onGet('/').networkError();
    });

    it('throws localized error', () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Network Error');
    });
  });

  describe('when raise timeout error', () => {
    beforeEach(() => {
      mock.onGet('/').timeout();
    });

    it('throws localized error', () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Timeout Error');
    });
  });

  describe('when raise request aborted', () => {
    beforeEach(() => {
      mock.onGet('/').reply(() => {
        throw new Error('Request aborted');
      });
    });

    it('throws localized error', () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Request aborted');
    });
  });

  describe('when unknown error', () => {
    beforeEach(() => {
      mock.onGet('/').reply(() => {
        throw new Error('Unknown error');
      });
    });

    it('throws raw error', () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Unknown error');
    });
  });
});
