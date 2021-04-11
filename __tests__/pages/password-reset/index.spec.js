import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '~/pages/password-reset/index';
import testId from '~/__tests__/__helpers__/test-id';

describe('Index', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click submit-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('email')).vm.$emit('input', 'example@example.com');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches auth/sendPasswordResetEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'auth/sendPasswordResetEmail',
        {
          email: 'example@example.com',
          redirectUrl: 'http://localhost/en/password-reset/edit',
        }
      );
    });
  });
});
