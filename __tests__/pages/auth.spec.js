import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Auth from '@/pages/auth';
import testId from '@/__tests__/__helpers__/test-id';

describe('Auth', () => {
  let factory;
  let wrapper;

  const $route = { query: {} };
  const $router = { replace: jest.fn() };
  const $cookies = { set: jest.fn(), remove: () => {} };
  const $config = {};
  const $store = new Store({
    getters: {
      'auth/loggedIn': false,
    },
  });

  beforeEach(() => {
    $store.reset();
    $route.query['sign-up'] = false;
    factory = () =>
      shallowMount(Auth, {
        mocks: {
          $store,
          $route,
          $router,
          $cookies,
          $config,
          $i18n: {
            locale: 'en',
          },
        },
      });
  });

  describe('when user already loggedIn', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      $cookies.get = () => undefined;
      factory();
    });

    it('redirect to index', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('when user already logged in and has previous path', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      $cookies.get = () => '/previous';
      factory();
    });

    it('redirects to previous path', () => {
      expect($router.replace).toHaveBeenCalledWith('/previous');
    });
  });

  describe('when user does not logged in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = false;
      wrapper = factory();
    });

    it('does not redirect', () => {
      expect($router.replace).not.toHaveBeenCalled();
    });
  });

  describe('when service has terms', () => {
    beforeEach(() => {
      $route.query['sign-up'] = true;
      $config.hackaruTermsUrl = 'example.com';
      wrapper = factory();
    });

    it('shows agreement of checkbox', () => {
      expect(wrapper.find('#agreement').exists()).toBe(true);
    });
  });

  describe('when service does not have terms', () => {
    beforeEach(() => {
      $route.query['sign-up'] = true;
      $config.hackaruTermsUrl = undefined;
      wrapper = factory();
    });

    it('hides agreement of checkbox', () => {
      expect(wrapper.find('#agreement').exists()).toBe(false);
    });
  });

  describe('when click login-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('email')).vm.$emit('input', 'example@example.com');
      wrapper.find(testId('password')).vm.$emit('input', 'password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/login', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/login', {
        email: 'example@example.com',
        password: 'password',
      });
    });
  });

  describe('when click sign-up button', () => {
    beforeEach(() => {
      $route.query['sign-up'] = true;
      wrapper = factory();
      wrapper.find(testId('email')).vm.$emit('input', 'example@example.com');
      wrapper.find(testId('password')).vm.$emit('input', 'password');
      wrapper
        .find(testId('password-confirmation'))
        .vm.$emit('input', 'confirmation');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/signUp', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/signUp', {
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'confirmation',
        locale: 'en',
      });
    });
  });
});
