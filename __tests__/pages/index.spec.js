import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/index';

describe('Index', () => {
  let wrapper;

  const $modal = { show: jest.fn() };
  const $store = new Store({
    getters: {
      'activities/getWorkingActivities': () => [
        {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ]
    }
  });

  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store,
        $modal
      }
    });

  it('dispatch activities/getWorkingActivities', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith(
      'activities/getWorkingActivities'
    );
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
