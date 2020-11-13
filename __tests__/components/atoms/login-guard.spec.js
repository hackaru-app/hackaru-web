import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import LoginGuard from '@/components/atoms/login-guard';

describe('LoginGuard', () => {
  const $store = new Store({});
  const $router = { replace: jest.fn() };
  const scope = { setUser: jest.fn() };

  const factory = () =>
    shallowMount(LoginGuard, {
      mocks: {
        $store,
        $router,
        $route: { fullPath: '/secure' },
        $sentry: {
          configureScope: (fn) => fn(scope),
        },
      },
    });

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    $store.reset();
  });

  describe('when user is not logged-in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = false;
      factory();
    });

    it('redirect to login page', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/auth');
    });

    it('save current path', () => {
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'previousPath',
        '/secure'
      );
    });
  });

  describe('when user is logged-in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      $store.getters['auth/userId'] = 1;
      factory();
    });

    it('does not redirect', () => {
      expect($router.replace).not.toHaveBeenCalled();
    });

    it('save user id to sentry', () => {
      expect(scope.setUser).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
