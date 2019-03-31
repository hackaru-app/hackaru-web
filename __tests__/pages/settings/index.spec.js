import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Index from '@/pages/settings/index';

describe('Index', () => {
  let factory;
  let wrapper;

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

  const $store = new Store({
    getters: {
      'auth/getEmail': 'example@example.com'
    }
  });

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Index, {
      mocks: { $store }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when submit change email form', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        emailForm: {
          email: 'example@example.com',
          currentPassword: 'currentPassword'
        }
      });
      wrapper.find('form.email').trigger('submit.prevent');
    });

    it('dispatch auth/changeEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changeEmail', {
        email: 'example@example.com',
        currentPassword: 'currentPassword'
      });
    });

    it('show success toast', () => {
      expect(factory.options.mocks.$toast.success).toHaveBeenCalled();
    });
  });

  describe('when submit change email form but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form.email').trigger('submit.prevent');
    });

    it('does not show success toast', () => {
      expect(factory.options.mocks.$toast.success).not.toHaveBeenCalled();
    });
  });

  describe('when submit change password form', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        passwordForm: {
          currentPassword: 'currentPassword',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation'
        }
      });
      wrapper.find('form.password').trigger('submit.prevent');
    });

    it('dispatch auth/changePassword', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changePassword', {
        currentPassword: 'currentPassword',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
    });

    it('show success toast', () => {
      expect(factory.options.mocks.$toast.success).toHaveBeenCalled();
    });
  });

  describe('when submit change password form but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form.password').trigger('submit.prevent');
    });

    it('does not show success toast', () => {
      expect(factory.options.mocks.$toast.success).not.toHaveBeenCalled();
    });
  });

  describe('when click logout button and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory.shallow();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('dispatch auth/logout', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/logout');
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'auth',
        'logout'
      );
    });

    it('redirect to index', () => {
      expect(location).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('when click logout button and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory.shallow();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('does not dispatch auth/logout', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('does not redirect', () => {
      expect(location).not.toHaveBeenCalled();
    });
  });

  describe('when click deleteAccount button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.delete-account-button').vm.$emit('click');
    });

    it('show modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'deleteAccount'
      );
    });
  });

  describe('when submit delete account form and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        deleteAccountForm: {
          currentPassword: 'currentPassword'
        }
      });
      wrapper.find('form.delete-account').trigger('submit.prevent');
    });

    it('dispatch auth/deleteAccount', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/deleteAccount', {
        currentPassword: 'currentPassword'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'auth',
        'deleteAccount'
      );
    });

    it('redirect to index', () => {
      expect(location).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('when submit delete account form and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        deleteAccountForm: {
          currentPassword: 'currentPassword'
        }
      });
      wrapper.find('form.delete-account').trigger('submit.prevent');
    });

    it('does not dispatch auth/deleteAccount', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('does not redirect', () => {
      expect(location).not.toHaveBeenCalled();
    });
  });

  describe('when submit delete account form but failed', () => {
    beforeEach(() => {
      global.confirm = () => true;
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.setData({
        deleteAccountForm: {
          currentPassword: 'currentPassword'
        }
      });
      wrapper.find('form.delete-account').trigger('submit.prevent');
    });

    it('does not redirect to index', () => {
      expect(location).not.toHaveBeenCalledWith();
    });
  });
});
