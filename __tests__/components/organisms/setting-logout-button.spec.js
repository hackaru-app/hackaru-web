import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingLogoutButton from '@/components/organisms/setting-logout-button';

describe('SettingLogoutButton', () => {
  let wrapper;

  delete window.location;
  window.location = { assign: jest.fn() };

  const $store = new Store({});
  const factory = () =>
    shallowMount(SettingLogoutButton, {
      mocks: {
        $store
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('click logout-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('dispatch auth/logout', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/logout');
    });

    it('redirect to index', () => {
      expect(window.location.assign).toHaveBeenCalledWith('/en/index');
    });

    it('removes user id', () => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
    });
  });

  describe('click logout-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('does not dispatch ', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('does not remove user id', () => {
      expect(localStorage.removeItem).not.toHaveBeenCalledWith('userId');
    });
  });
});
