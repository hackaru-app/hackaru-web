import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Authorize from '@/pages/oauth/authorize';

const testId = (id) => `[data-test-id="${id}"]`;

describe('Authorize', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'auth/email': 'example@example.com',
      'oauth/client': {
        name: 'ExampleApp',
        scopes: ['activities:read'],
        responseType: 'token',
        state: 'state',
      },
    },
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
            state: 'state',
            response_type: 'token',
            scope: ['activities:read'],
          },
        },
      },
    });

  delete window.location;
  window.location = { assign: jest.fn() };

  beforeEach(() => {
    $store.reset();
  });

  describe('when mount component', () => {
    beforeEach(() => {
      wrapper = factory();
    });

    it('dispatches oauth/fetchClient', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/fetchClient', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
      });
    });
  });

  describe('when mount component but already allowed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
    });

    it('redirect to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
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
        query: { error_description: 'denied' },
      });
    });
  });

  describe('when click allow-button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
      wrapper.find(testId('allow-button')).vm.$emit('click');
    });

    it('dispatches oauth/allow', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/allow', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
      });
    });

    it('redirect to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
    });
  });

  describe('when click allow-button and returns access token', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ accessToken: 'accessToken' });
      wrapper = factory();
      wrapper.find(testId('allow-button')).vm.$emit('click');
    });

    it('redirect to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { access_token: 'accessToken' },
      });
    });
  });

  describe('when click deny-button and returns callback url', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue('http://example.com/callback');
      wrapper = factory();
      wrapper.find(testId('deny-button')).vm.$emit('click');
    });

    it('dispatches oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
      });
    });

    it('redirect to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
    });
  });

  describe('when click deny-button and returns error description', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ errorDescription: 'denied' });
      wrapper = factory();
      wrapper.find(testId('deny-button')).vm.$emit('click');
    });

    it('dispatches oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'token',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
      });
    });

    it('redirect to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { error_description: 'denied' },
      });
    });
  });
});
