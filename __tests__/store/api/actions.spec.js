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
    actions.$config = { hackaruApiUrl: 'http://localhost' };
    actions.$i18n = new VueI18n({ locale: 'en', messages: translations });
  });

  describe('when dispatch request', () => {
    beforeEach(async () => {
      mock.onPost('http://localhost/example').replyOnce(200);
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
        .onGet('http://localhost/example')
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
        .onGet('http://localhost/example')
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

  describe('when content-type is not json', () => {
    beforeEach(async () => {
      mock.onGet('http://localhost/example').reply(200, { foo_bar: 'baz' });
      result = await actions.request(
        {},
        {
          url: '/example',
          responseType: 'blob',
        }
      );
    });

    it('does not convert response', () => {
      expect(result.data.foo_bar).toBe('baz');
    });
  });

  describe('when response data is empty', () => {
    beforeEach(async () => {
      mock.onGet('http://localhost/example').reply(200, {});
      result = await actions.request({}, { url: '/example' });
    });

    it('returns empty data', () => {
      expect(result.data).toEqual({});
    });
  });

  describe('when request is Network Error', () => {
    beforeEach(() => {
      mock.onGet('http://localhost/').networkError();
    });

    it('catch Error with english message', async () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Network Error');
    });
  });

  describe('when request is Timeout', () => {
    beforeEach(() => {
      mock.onGet('http://localhost/').timeout();
    });

    it('catch Error with english message', async () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Timeout Error');
    });
  });

  describe('when request aborted', () => {
    beforeEach(() => {
      // axios-mock-adapterでRequest abortedのテストを書きたいけど、以下のURLにあるような関数が定義されていないので、
      // 自前でエラーを発生させる。
      // https://github.com/ctimmerm/axios-mock-adapter/blob/master/src/index.js#L97
      mock.onGet('http://localhost/').reply((config) => {
        throw new Error('Request aborted');
      });
    });

    it('catch Error with english message', async () => {
      const request = actions.request({}, { url: '/' });
      expect(request).rejects.toThrow('Request aborted');
    });
  });
});
