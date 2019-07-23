import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/index';

describe('Index', () => {
  const $store = new Store();
  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store
      }
    });

  it('dispatch activities/fetchWorkings', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('activities/fetchWorkings');
  });
});
