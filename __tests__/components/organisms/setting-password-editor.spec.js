import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingPasswordEditor from '~/components/organisms/setting-password-editor';
import testId from '~/__tests__/__helpers__/test-id';

describe('SettingPasswordEditor', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(SettingPasswordEditor, {
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('click submit-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find(testId('current-password')).vm.$emit('input', 'current');
      wrapper.find(testId('password')).vm.$emit('input', 'password');
      wrapper
        .find(testId('password-confirmation'))
        .vm.$emit('input', 'confirmation');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/changePassword', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changePassword', {
        password: 'password',
        currentPassword: 'current',
        passwordConfirmation: 'confirmation',
      });
    });
  });
});
