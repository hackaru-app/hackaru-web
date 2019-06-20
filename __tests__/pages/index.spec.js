import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/index';

describe('Index', () => {
  let wrapper;

  const $modal = { show: jest.fn() };
  const $store = new Store({
    getters: {
      'activities/workings': [],
      'activities/weekly': []
    }
  });

  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store,
        $modal
      }
    });

  it('dispatch activities/fetchWorkings', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('activities/fetchWorkings');
  });

  describe('when click add-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('show activity-modal', () => {
      expect($modal.show).toHaveBeenCalledWith('activity');
    });
  });
});
