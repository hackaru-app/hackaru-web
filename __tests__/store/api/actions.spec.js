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

    it('converts params to snakecase', () => {
      expect(mock.history.post[0].params).toEqual({ foo_bar: 'baz' });
    });

    it('converts data to snakecase', () => {
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

    it('converts response to camelcase', () => {
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

    it('converts response to camelcase', () => {
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

  describe('when response is error', () => {
    beforeEach(() => {
      mock
        .onGet('/example')
        .reply(401, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
    });

    it('converts response to camelcase', () => {
      return actions.request({}, { url: '/example' }).catch((error) => {
        expect(error.response.data.fooBar).toBe('baz');
        expect(error.response.data.foo.barBaz).toBe('foo');
      });
    });
  });

  describe('when raise network error', () => {
    beforeEach(() => {
      mock.onGet('/').networkError();
    });

    it('returns localized message', () => {
      return actions
        .request({}, { url: '/' })
        .catch((error) => expect(error.message).toBe('Network Error'));
    });
  });

  describe('when raise timeout error', () => {
    beforeEach(() => {
      mock.onGet('/').timeout();
    });

    it('returns localized message', () => {
      return actions
        .request({}, { url: '/' })
        .catch((error) => expect(error.message).toBe('Timeout Error'));
    });
  });

  describe('when raise request aborted', () => {
    beforeEach(() => {
      mock.onGet('/').reply(() => {
        throw new Error('Request aborted');
      });
    });

    it('returns localized message', () => {
      return actions
        .request({}, { url: '/' })
        .catch((error) => expect(error.message).toBe('Request aborted'));
    });
  });

  describe('when raise unknown error', () => {
    beforeEach(() => {
      mock.onGet('/').reply(() => {
        throw new Error('Unknown error');
      });
    });

    it('returns raw message', () => {
      return actions
        .request({}, { url: '/' })
        .catch((error) => expect(error.message).toBe('Unknown error'));
    });
  });
});
