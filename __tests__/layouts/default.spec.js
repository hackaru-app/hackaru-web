import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import MockDate from 'mockdate';
import Default from '@/layouts/default';

describe('Default', () => {
  let factory;
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'activities/getWorkingActivities': () => []
    }
  });

  beforeEach(() => {
    $store.reset();

    factory = new Factory(Default, {
      stubs: ['nuxt'],
      mocks: { $store }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('dispatch projects/getProjects', () => {
    factory.shallow();
    expect($store.dispatch).toHaveBeenCalledWith('projects/getProjects');
  });

  describe('when call updateDuration and has no working activities', () => {
    beforeEach(() => {
      $store.getters['activities/getWorkingActivities'] = [];
      wrapper = factory.shallow();
      wrapper.vm.updateDuration();
    });

    it('does not have titleTemplate', () => {
      expect(wrapper.vm.$meta().inject().titleTemplate).toBeUndefined();
    });
  });

  describe('when call updateDuration and has working activities', () => {
    beforeEach(() => {
      $store.getters['activities/getWorkingActivities'] = [
        {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ];
      wrapper = factory.shallow();
      wrapper.vm.updateDuration();
    });

    it('has titleTemplate correctly', () => {
      expect(wrapper.vm.$meta().inject().titleTemplate).toBe('720:00:00・%s');
    });
  });
});
