import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingPasswordEditor from '@/components/organisms/setting-password-editor';

describe('SettingPasswordEditor', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(SettingPasswordEditor, {
      mocks: {
        $store
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('click submit-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.current-password').vm.$emit('input', 'current');
      wrapper.find('.password').vm.$emit('input', 'password');
      wrapper.find('.password-confirmation').vm.$emit('input', 'confirmation');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/changePassword', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changePassword', {
        password: 'password',
        currentPassword: 'current',
        passwordConfirmation: 'confirmation'
      });
    });
  });
});
