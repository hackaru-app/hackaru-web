import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SettingTimeZoneSelect from '~/components/organisms/setting-time-zone-select';
import testId from '~/__tests__/__helpers__/test-id';

describe('SettingTimeZoneSelect', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'user/timeZone': 'Etc/UTC',
    },
  });

  const factory = () =>
    shallowMount(SettingTimeZoneSelect, {
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
      wrapper.find(testId('base-select')).vm.$emit('change', 'Asia/Tokyo');
    });

    it('changes user/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('user/update', {
        timeZone: 'Asia/Tokyo',
      });
    });
  });
});
