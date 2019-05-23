import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingDeleteAccountButton from '@/components/organisms/setting-delete-account-button';

describe('SettingDeleteAccountButton', () => {
  let wrapper;

  const location = jest
    .spyOn(window.location, 'assign')
    .mockImplementation(() => {});

  const $store = new Store({});
  const $modal = { show: jest.fn() };
  const factory = () =>
    shallowMount(SettingDeleteAccountButton, {
      mocks: {
        $store,
        $modal
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.delete-account-button').vm.$emit('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalled();
    });
  });

  describe('enter password and click submit-button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.current-password').setValue('password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/deleteAccount', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/deleteAccount', {
        currentPassword: 'password'
      });
    });

    it('redirect to index', () => {
      expect(location).toHaveBeenCalledWith('/en/index');
    });
  });

  describe('enter password and click submit-button but confirm is false', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find('.current-password').setValue('password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not dispatch auth/deleteAccount', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
