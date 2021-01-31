import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingLogoutButton from '@/components/organisms/setting-logout-button';
import testId from '@/__tests__/__helpers__/test-id';

describe('SettingLogoutButton', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $store = new Store({});

  const factory = () =>
    shallowMount(SettingLogoutButton, {
      mocks: {
        $ga,
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click logout-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find(testId('logout-button')).vm.$emit('click');
    });

    it('dispatches auth/logout', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/logout');
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Accounts',
        eventAction: 'logout',
      });
    });
  });

  describe('when click logout-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find(testId('logout-button')).vm.$emit('click');
    });

    it('does not dispatch ', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
    });
  });
});
