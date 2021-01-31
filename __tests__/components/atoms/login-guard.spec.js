import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import LoginGuard from '@/components/atoms/login-guard';

describe('LoginGuard', () => {
  const $store = new Store({
    getters: {
      'auth/loggedIn': false,
      'auth/userId': undefined,
    },
  });
  const $router = { replace: jest.fn() };
  const $cookies = { set: jest.fn() };
  const $ga = { set: jest.fn() };
  const scope = { setUser: jest.fn() };

  delete window.location;
  window.location = { assign: jest.fn() };

  const factory = () =>
    shallowMount(LoginGuard, {
      mocks: {
        $store,
        $router,
        $cookies,
        $ga,
        $route: { fullPath: '/secure' },
        $sentry: {
          configureScope: (fn) => fn(scope),
        },
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when user is not loggedIn', () => {
    beforeEach(() => {
      factory();
    });

    it('redirects to login page', () => {
      expect(window.location.assign).toHaveBeenCalledWith('/en/auth');
    });

    it('stores current path', () => {
      expect($cookies.set).toHaveBeenCalledWith('previous_path', '/secure');
    });
  });

  describe('when user is logged-in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      $store.getters['auth/userId'] = 1;
      factory();
    });

    it('does not redirect', () => {
      expect(window.location.assign).not.toHaveBeenCalled();
    });

    it('saves userId to sentry', () => {
      expect(scope.setUser).toHaveBeenCalledWith({ id: 1 });
    });

    it('saves userId to google analytics', () => {
      expect($ga.set).toHaveBeenCalledWith({ userId: 1 });
    });
  });
});
