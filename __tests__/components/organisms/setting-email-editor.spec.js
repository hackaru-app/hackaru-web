import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingEmailEditor from '@/components/organisms/setting-email-editor';
import testId from '@/__tests__/__helpers__/test-id';

describe('SettingEmailEditor', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(SettingEmailEditor, {
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when clicks submit-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find(testId('email')).vm.$emit('input', 'example@example.com');
      wrapper.find(testId('current-password')).vm.$emit('input', 'password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/changeEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changeEmail', {
        email: 'example@example.com',
        currentPassword: 'password',
      });
    });
  });
});
