import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Auth from '@/pages/auth';

const testId = (id) => `[data-test-id="${id}"]`;

describe('Auth', () => {
  let factory;
  let wrapper;

  const $route = { query: {} };
  const $router = { replace: jest.fn() };
  const $env = {};
  const $store = new Store({
    getters: {
      'auth/loggedIn': false,
    },
  });

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    $store.reset();
    $route.query['sign-up'] = false;
    factory = () =>
      shallowMount(Auth, {
        mocks: {
          $store,
          $route,
          $router,
          $env,
          $i18n: {
            locale: 'en',
          },
        },
      });
  });

  describe('when user already logged in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      factory();
    });

    it('redirect to index', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('when user already logged in and has previous path', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      sessionStorage.setItem('previousPath', '/previous');
      factory();
    });

    it('redirect to previous path', () => {
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

  describe('when service has HACKARU_TOS_AND_PRIVACY_URL', () => {
    beforeEach(() => {
      $route.query['sign-up'] = true;
      $env.HACKARU_TOS_AND_PRIVACY_URL = 'example.com';
      wrapper = factory();
    });

    it('shows agreement of checkbox', () => {
      expect(wrapper.find('#agreement').exists()).toBe(true);
    });
  });

  describe('when service does not have HACKARU_TOS_AND_PRIVACY_URL', () => {
    beforeEach(() => {
      $route.query['sign-up'] = true;
      $env.HACKARU_TOS_AND_PRIVACY_URL = undefined;
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

    it('dispatches auth/fetchRefreshToken', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/fetchRefreshToken', {
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
