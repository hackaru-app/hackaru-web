import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Integrations from '~/pages/settings/integrations';
import testId from '~/__tests__/__helpers__/test-id';

describe('Integrations', () => {
  let wrapper;

  delete window.location;
  window.location = { assign: jest.fn() };

  const $ga = { event: jest.fn() };
  const $mixpanel = { track: jest.fn() };
  const $store = new Store({
    getters: {
      'activity-calendar/calendarUrl': 'https://example.com',
    },
  });

  const factory = () =>
    shallowMount(Integrations, {
      mocks: {
        $ga,
        $mixpanel,
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click calendar button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find(testId('other-calendar-button')).vm.$emit('click');
    });

    it('dispatches activity-calendar/createUrl', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activity-calendar/createUrl'
      );
    });
  });
});
