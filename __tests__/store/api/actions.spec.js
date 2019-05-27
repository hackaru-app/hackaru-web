import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { actions } from '@/store/api';

describe('Actions', () => {
  let result;

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    actions.$env = { HACKARU_API_URL: 'http://localhost' };
    actions.app = { i18n: { locale: 'en' } };
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
            fooBar: 'baz'
          },
          data: {
            barBaz: 'baz'
          }
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

  describe('when response data', () => {
    beforeEach(async () => {
      mock
        .onGet('http://localhost/example')
        .reply(200, { foo_bar: 'baz', foo: { bar_baz: 'foo' } });
      result = await actions.request({}, { url: '/example' });
    });

    it('convert to camelcase', () => {
      expect(result.data.fooBar).toBe('baz');
    });

    it('convert to camelcase deeply', () => {
      expect(result.data.foo.barBaz).toBe('foo');
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
});
