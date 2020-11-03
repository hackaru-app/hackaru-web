import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import Toast from '@/components/molecules/toast';

const testId = (id) => `[data-test-id="${id}"]`;

describe('Toast', () => {
  let wrapper;

  jest.useFakeTimers();

  const $store = new Store({
    getters: {
      'toast/message': {
        text: 'message',
        type: 'success',
        rand: 12345,
        duration: 500,
      },
    },
  });

  const factory = () =>
    shallowMount(Toast, {
      mocks: {
        $store,
      },
    });

  describe('when change message', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['toast/message'] = {
        text: 'new message',
        type: 'success',
        rand: 456789,
        duration: 500,
      };
    });

    it('shows new message', () => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find(testId('content')).text()).toBe('new message');
        expect(wrapper.find(testId('content')).exists()).toBe(true);
      });
    });

    it('hides toast delayed', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.find(testId('content')).exists()).toBe(false);
    });
  });
});
