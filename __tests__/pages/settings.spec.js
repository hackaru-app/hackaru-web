import { shallowMount } from '@vue/test-utils';
import Settings from '@/pages/settings';

describe('Settings', () => {
  let wrapper;

  const $router = { push: jest.fn() };
  const factory = () =>
    shallowMount(Settings, {
      mocks: {
        $router,
        $route: { path: '/' },
      },
    });

  describe('when change selected tab', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.tabs').vm.$emit('change', 1);
    });

    it('move to selected page', () => {
      expect($router.push).toHaveBeenCalledWith('./integrations');
    });
  });
});
