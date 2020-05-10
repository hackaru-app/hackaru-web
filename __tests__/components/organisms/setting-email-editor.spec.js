import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingEmailEditor from '@/components/organisms/setting-email-editor';

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

  describe('click submit-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.email').vm.$emit('input', 'example@example.com');
      wrapper.find('.current-password').vm.$emit('input', 'password');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/changeEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/changeEmail', {
        email: 'example@example.com',
        currentPassword: 'password',
      });
    });
  });
});
