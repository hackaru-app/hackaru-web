import { shallowMount } from '@vue/test-utils';
import Settings from '@/pages/settings';
import testId from '@/__tests__/__helpers__/test-id';

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
      wrapper.find(testId('tabs')).vm.$emit('change', 1);
    });

    it('moves to selected page', () => {
      expect($router.push).toHaveBeenCalledWith('./integrations');
    });
  });
});
