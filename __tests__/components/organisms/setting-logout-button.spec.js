import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingLogoutButton from '@/components/organisms/setting-logout-button';

describe('SettingLogoutButton', () => {
  let wrapper;

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

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
      expect(location).toHaveBeenCalledWith('/en/index');
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
  });
});
