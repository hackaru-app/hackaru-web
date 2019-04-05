import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Auth from '@/pages/auth';

describe('Auth', () => {
  let factory;
  let wrapper;

  const $store = new Store({
    getters: {
      'auth/isLoggedIn': false
    }
  });

  beforeEach(() => {
    sessionStorage.clear();
    $store.reset();
    factory = new Factory(Auth, {
      mocks: {
        $store,
        $env: { GOOGLE_ANALYTICS_TRACKING_ID: 'UA-01234-1' }
      }
    });
  });

  describe('when user already logged in and has no previous path', () => {
    beforeEach(() => {
      $store.getters['auth/isLoggedIn'] = true;
      factory.shallow();
    });

    it('redirect to index', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        '/en/index'
      );
    });
  });

  describe('when user already logged in and has previous path', () => {
    beforeEach(() => {
      $store.getters['auth/isLoggedIn'] = true;
      sessionStorage.setItem('previousPath', '/previous');
      factory.shallow();
    });

    it('redirect to before path', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        '/previous'
      );
    });
  });

  describe('when user does not logged in', () => {
    beforeEach(() => {
      $store.getters['auth/isLoggedIn'] = false;
      wrapper = factory.shallow();
    });

    it('does not redirect to index', () => {
      expect(factory.options.mocks.$router.push).not.toHaveBeenCalledWith(
        'index'
      );
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('render title correctly', () => {
      expect(
        wrapper.vm
          .$meta()
          .inject()
          .title.text()
      ).toMatchSnapshot();
    });
  });

  describe('when click toggle button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.toggle-button').trigger('click');
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('change title', () => {
      expect(
        wrapper.vm
          .$meta()
          .inject()
          .title.text()
      ).toMatchSnapshot();
    });
  });

  describe('when it has term of service and privacy', () => {
    beforeEach(() => {
      factory.options.mocks.$env.HACKARU_TOS_AND_PRIVACY_URL = 'example.com';
      wrapper = factory.shallow();
      wrapper.find('.toggle-button').trigger('click');
    });

    it('show agreement of checkbox', () => {
      expect(wrapper.find('#agreement').exists()).toBe(true);
    });
  });

  describe('when it does not have term of service and privacy', () => {
    beforeEach(() => {
      factory.options.mocks.$env.HACKARU_TOS_AND_PRIVACY_URL = undefined;
      wrapper = factory.shallow();
      wrapper.find('.toggle-button').trigger('click');
    });

    it('hide agreement of checkbox', () => {
      expect(wrapper.find('#agreement').exists()).toBe(false);
    });
  });

  describe('when click login button', () => {
    beforeEach(() => {
      sessionStorage.setItem('previousPath', '/previous');
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        email: 'example@example.com',
        password: 'password',
        hasAccount: true
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/fetchRefreshToken', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/fetchRefreshToken', {
        email: 'example@example.com',
        password: 'password'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'auth',
        'login'
      );
    });

    it('move to previous page', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        '/previous'
      );
    });
  });

  describe('when click login button but login failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not move to previous page', () => {
      expect(factory.options.mocks.$router.push).not.toHaveBeenCalled();
    });
  });

  describe('when click sign up button', () => {
    beforeEach(() => {
      sessionStorage.setItem('previousPath', '/previous');
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation',
        hasAccount: false
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/signUp', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/signUp', {
        email: 'example@example.com',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'auth',
        'signUp'
      );
    });

    it('move to previous page', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        '/previous'
      );
    });
  });

  describe('when click sign up button but sign up failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.setData({ hasAccount: false });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not move to previous page', () => {
      expect(factory.options.mocks.$router.push).not.toHaveBeenCalled();
    });
  });
});
