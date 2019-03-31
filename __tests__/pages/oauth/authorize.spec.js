import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Authorize from '@/pages/oauth/authorize';
import snakecaseKeys from 'snakecase-keys';

describe('Authorize', () => {
  let wrapper;
  let factory;

  const $store = new Store({
    getters: {
      'auth/getEmail': 'example@example.com',
      'oauth/getClient': {
        name: 'ExampleApp',
        scopes: ['activities:read', 'activities:write'],
        responseType: 'token',
        state: 'state'
      }
    }
  });

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Authorize, {
      mocks: {
        $store,
        $route: {
          query: snakecaseKeys({
            clientId: 'clientId',
            secret: 'secret',
            redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
            state: 'state',
            responseType: 'token',
            scope: ['activities:read', 'activities:write']
          })
        }
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click allow button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory.shallow();
      wrapper.find({ ref: 'allow-button' }).vm.$emit('click');
    });

    it('dispatch oauth/allow', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/allow', {
        clientId: 'clientId',
        scope: ['activities:read', 'activities:write'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'oauth',
        'allow'
      );
    });

    it('redirect to callback url', () => {
      expect(location).toHaveBeenCalledWith('http://example.com/callback');
    });
  });

  describe('when click allow button and returns access token', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({
        accessToken: 'accessToken'
      });
      wrapper = factory.shallow();
      wrapper.find({ ref: 'allow-button' }).vm.$emit('click');
    });

    it('redirect to default callback url', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: snakecaseKeys({ accessToken: 'accessToken' })
      });
    });
  });

  describe('when click deny button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory.shallow();
      wrapper.find({ ref: 'deny-button' }).vm.$emit('click');
    });

    it('dispatch oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read', 'activities:write'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'oauth',
        'deny'
      );
    });

    it('redirect to callback url', () => {
      expect(location).toHaveBeenCalledWith('http://example.com/callback');
    });
  });

  describe('when click deny button and returns error description', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({
        errorDescription: 'denied'
      });
      wrapper = factory.shallow();
      wrapper.find({ ref: 'deny-button' }).vm.$emit('click');
    });

    it('dispatch oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read', 'activities:write'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state'
      });
    });

    it('redirect to default callback url', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: snakecaseKeys({ errorDescription: 'denied' })
      });
    });
  });
});
