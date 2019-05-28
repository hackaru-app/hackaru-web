import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import MockDate from 'mockdate';
import Default from '@/layouts/default';

describe('Default', () => {
  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'activities/getWorkingActivities': () => []
    }
  });

  const factory = () =>
    shallowMount(Default, {
      stubs: ['nuxt'],
      mocks: { $store }
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatch projects/fetch', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('projects/fetch');
  });
});
