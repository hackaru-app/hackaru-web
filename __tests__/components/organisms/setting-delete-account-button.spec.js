import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingDeleteAccountButton from '~/components/organisms/setting-delete-account-button';
import testId from '~/__tests__/__helpers__/test-id';

describe('SettingDeleteAccountButton', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $store = new Store({});

  const factory = () =>
    shallowMount(SettingDeleteAccountButton, {
      mocks: {
        $ga,
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when enter password and click submit-button', () => {
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

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Accounts',
        eventAction: 'delete',
      });
    });
  });

  describe('when enter password and click submit-button but confirm is false', () => {
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

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
    });
  });
});
