import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Authorize from '~/pages/oauth/authorize';
import testId from '~/__tests__/__helpers__/test-id';

describe('Authorize', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $mixpanel = { track: jest.fn() };
  const $store = new Store({
    getters: {
      'auth/email': 'example@example.com',
      'oauth/decided': false,
      'oauth/client': {
        name: 'ExampleApp',
        scopes: ['activities:read'],
        responseType: 'code',
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
        $mixpanel,
        $route: {
          query: {
            client_id: 'clientId',
            secret: 'secret',
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            state: 'state',
            response_type: 'code',
            scope: ['activities:read'],
            code_challenge: 'codeChallenge',
            code_challenge_method: 'S256',
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
        responseType: 'code',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        codeChallenge: 'codeChallenge',
        codeChallengeMethod: 'S256',
      });
    });
  });

  describe('when click allow-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('allow-button')).vm.$emit('click');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith(
        'Decide oauth authorization',
        {
          component: 'authorize',
          action: 'allow',
        }
      );
    });

    it('dispatches oauth/allow', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/allow', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'code',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        codeChallenge: 'codeChallenge',
        codeChallengeMethod: 'S256',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'OAuth',
        eventAction: 'allow',
      });
    });
  });

  describe('when sets redirectUri', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['oauth/decided'] = true;
      $store.getters['oauth/redirectUri'] = 'http://example.com';
    });

    it('redirects to callback url', () => {
      expect(window.location.assign).toHaveBeenCalledWith('http://example.com');
    });
  });

  describe('when sets code', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['oauth/decided'] = true;
      $store.getters['oauth/redirectUri'] = '';
      $store.getters['oauth/redirectQuery'] = {
        code: 'code',
        accessToken: '',
        errorDescription: '',
      };
    });

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/en/oauth/callback',
        query: { accessToken: '', code: 'code', errorDescription: '' },
      });
    });
  });

  describe('when sets accessToken', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['oauth/decided'] = true;
      $store.getters['oauth/redirectUri'] = '';
      $store.getters['oauth/redirectQuery'] = {
        code: '',
        accessToken: 'accessToken',
        errorDescription: '',
      };
    });

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/en/oauth/callback',
        query: { accessToken: 'accessToken', code: '', errorDescription: '' },
      });
    });
  });

  describe('when sets errorDescription', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['oauth/decided'] = true;
      $store.getters['oauth/redirectUri'] = '';
      $store.getters['oauth/redirectQuery'] = {
        code: '',
        accessToken: '',
        errorDescription: 'errorDescription',
      };
    });

    it('redirects to default callback url', () => {
      expect($router.push).toHaveBeenCalledWith({
        path: '/en/oauth/callback',
        query: {
          accessToken: '',
          code: '',
          errorDescription: 'errorDescription',
        },
      });
    });
  });

  describe('when click deny-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('deny-button')).vm.$emit('click');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith(
        'Decide oauth authorization',
        {
          component: 'authorize',
          action: 'deny',
        }
      );
    });

    it('dispatches oauth/deny', () => {
      expect($store.dispatch).toHaveBeenCalledWith('oauth/deny', {
        clientId: 'clientId',
        scope: ['activities:read'],
        responseType: 'code',
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
        state: 'state',
        codeChallenge: 'codeChallenge',
        codeChallengeMethod: 'S256',
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
