import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Edit from '@/pages/password-reset/edit';

describe('Edit', () => {
  let wrapper;

  const $store = new Store();
  const factory = () =>
    shallowMount(Edit, {
      mocks: {
        $store,
        $route: {
          query: {
            user_id: 1,
            token: 'token'
          }
        }
      }
    });

  describe('when click submit-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.password').vm.$emit('input', 'password');
      wrapper.find('.password-confirmation').vm.$emit('input', 'confirmation');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/resetPassword', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/resetPassword', {
        id: 1,
        password: 'password',
        passwordConfirmation: 'confirmation',
        token: 'token'
      });
    });
  });
});
