import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Authorize from '@/pages/oauth/authorize';

describe('Authorize', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'auth/getEmail': 'example@example.com',
      'oauth/getClient': {
        name: 'ExampleApp',
        scopes: ['activities:read'],
        responseType: 'token',
        state: 'state'
      }
    }
  });

  const $router = { push: jest.fn() };
  const factory = () =>
    shallowMount(Authorize, {
      mocks: {
        $store,
        $router,
        $route: {
          query: {
            client_id: 'clientId',
            secret: 'secret',
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            state: '123abc456def',
            response_type: 'token',
            scope: ['activities:read']
          }
        }
      }
    });

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

  beforeEach(() => {
    $store.reset();
  });

  describe('when mount component', () => {
    beforeEach(() => {
      wrapper = factory();
    });

    it('dispatch oauth/getClient', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/getClient', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: '123abc456def'
      });
    });
  });

  describe('when mount component but already allowed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
    });

    it('redirect to callback url', () => {
      expect(location).toHaveBeenCalledWith('http://example.com/callback');
    });
  });

  describe('when mount component but already denied', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ errorDescription: 'denied' });
      wrapper = factory();
    });

    it('redirect to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { error_description: 'denied' }
      });
    });
  });

  describe('when click allow-button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
      wrapper.find('.allow-button').vm.$emit('click');
    });

    it('dispatch oauth/allow', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/allow', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: '123abc456def'
      });
    });

    it('redirect to callback url', () => {
      expect(location).toHaveBeenCalledWith('http://example.com/callback');
    });
  });

  describe('when click allow-button and returns access token', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ accessToken: 'accessToken' });
      wrapper = factory();
      wrapper.find('.allow-button').vm.$emit('click');
    });

    it('redirect to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { access_token: 'accessToken' }
      });
    });
  });

  describe('when click deny-button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
      wrapper.find('.deny-button').vm.$emit('click');
    });

    it('dispatch oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: '123abc456def'
      });
    });

    it('redirect to callback url', () => {
      expect(location).toHaveBeenCalledWith('http://example.com/callback');
    });
  });

  describe('when click deny-button and returns error description', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ errorDescription: 'denied' });
      wrapper = factory();
      wrapper.find('.deny-button').vm.$emit('click');
    });

    it('dispatch oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: '123abc456def'
      });
    });

    it('redirect to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { error_description: 'denied' }
      });
    });
  });
});
