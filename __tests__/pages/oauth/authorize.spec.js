import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Authorize from '@/pages/oauth/authorize';
import testId from '@/__tests__/__helpers__/test-id';

describe('Authorize', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
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
        $ga,
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

    it('redirects to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
    });
  });

  describe('when mount component but already denied', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ errorDescription: 'denied' });
      wrapper = factory();
    });

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { error_description: 'denied' },
      });
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
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

    it('redirects to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'OAuth',
        eventAction: 'allow',
      });
    });
  });

  describe('when click allow-button and returns access token', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue({ accessToken: 'accessToken' });
      wrapper = factory();
      wrapper.find(testId('allow-button')).vm.$emit('click');
    });

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { access_token: 'accessToken' },
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'OAuth',
        eventAction: 'allow',
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

    it('redirects to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'http://example.com/callback'
      );
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'OAuth',
        eventAction: 'deny',
      });
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

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/oauth/callback',
        query: { error_description: 'denied' },
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'OAuth',
        eventAction: 'deny',
      });
    });
  });
});
