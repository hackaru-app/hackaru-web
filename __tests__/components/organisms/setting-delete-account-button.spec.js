import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingDeleteAccountButton from '@/components/organisms/setting-delete-account-button';
import testId from '@/__tests__/__helpers__/test-id';

describe('SettingDeleteAccountButton', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(SettingDeleteAccountButton, {
      mocks: {
        $store,
      },
    });

  delete window.location;
  window.location = { assign: jest.fn() };

  beforeEach(() => {
    $store.reset();
  });

  describe('enter password and click submit-button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find(testId('current-password')).setValue('password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/deleteAccount', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/deleteAccount', {
        currentPassword: 'password',
      });
    });

    it('redirects to index', () => {
      expect(window.location.assign).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('enter password and click submit-button but confirm is false', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find(testId('current-password')).setValue('password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not dispatch auth/deleteAccount', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
