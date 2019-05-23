import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/password-reset/index';

describe('Index', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click submit-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.email').vm.$emit('input', 'example@example.com');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/sendPasswordResetEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'auth/sendPasswordResetEmail',
        {
          email: 'example@example.com',
          redirectUrl: 'http://localhost/en/password-reset/edit'
        }
      );
    });
  });
});
