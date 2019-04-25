import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import LoginGuard from '@/components/atoms/login-guard';

describe('LoginGuard', () => {
  let factory;

  const $store = new Store({});

  beforeEach(() => {
    sessionStorage.clear();
    $store.reset();
    factory = new Factory(LoginGuard, {
      mocks: {
        $store,
        $route: {
          fullPath: '/fullPath'
        }
      },
      slots: { default: '<p>Content</p>' }
    });
  });

  describe('when user has valid token', () => {
    beforeEach(() => {
      $store.getters['auth/isLoggedIn'] = true;
    });

    it('does not redirect', () => {
      expect(factory.shallow().element).toMatchSnapshot();
    });
  });

  describe('when user does not have valid token', () => {
    beforeEach(() => {
      $store.getters['auth/isLoggedIn'] = false;
    });

    it('redirect to /auth', () => {
      factory.shallow();
      expect(factory.options.mocks.$router.replace).toHaveBeenCalledWith(
        '/en/auth'
      );
    });

    it('save previous path', () => {
      factory.shallow();
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'previousPath',
        '/fullPath'
      );
    });
  });
});
