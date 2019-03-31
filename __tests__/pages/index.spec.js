import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Index from '@/pages/index';

describe('Index', () => {
  let wrapper;
  let factory;

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

  beforeEach(() => {
    factory = new Factory(Index, {
      mocks: {
        $store
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('dispatch activities/getWorkingActivities', () => {
    factory.shallow();
    expect($store.dispatch).toHaveBeenCalledWith(
      'activities/getWorkingActivities'
    );
  });

  describe('when click add button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('show new activity modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'activity'
      );
    });
  });
});
