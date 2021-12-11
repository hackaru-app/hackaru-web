import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingStartDaySelect from '~/components/organisms/setting-start-day-select';
import testId from '~/__tests__/__helpers__/test-id';

describe('SettingstartDaySelect', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'user/startDay': 0,
    },
  });

  const factory = () =>
    shallowMount(SettingStartDaySelect, {
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('base-select')).vm.$emit('change', 1);
    });

    it('changes user/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('user/update', {
        startDay: 1,
      });
    });
  });
});
