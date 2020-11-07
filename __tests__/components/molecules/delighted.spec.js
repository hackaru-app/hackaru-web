import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Delighted from '@/components/molecules/delighted';

describe('Delighted', () => {
  const $store = new Store({});
  const $config = {};

  beforeEach(() => {
    window.delighted = {
      survey: jest.fn(),
    };
  });

  const factory = () =>
    shallowMount(Delighted, {
      mocks: {
        $config,
        $store,
        $i18n: {
          locale: 'en',
        },
        $loadScript: () => {},
      },
    });

  describe('when config has delightedToken', () => {
    beforeEach(() => {
      $store.getters['auth/userId'] = 1;
      $config.delightedToken = 'token';
      factory();
    });

    it('shows survey', () => {
      expect(window.delighted.survey).toHaveBeenCalledWith({
        name: 1,
        properties: {
          locale: 'en',
        },
      });
    });
  });

  describe('when config does not have delightedToken', () => {
    beforeEach(() => {
      $config.delightedToken = undefined;
      factory();
    });

    it('does not show survey', () => {
      expect(window.delighted.survey).not.toHaveBeenCalled();
    });
  });

  describe('when window.delighted is undefined', () => {
    let wrapper;

    beforeEach(() => {
      window.delighted = undefined;
      $config.delightedToken = 'token';
      wrapper = factory();
    });

    it('does not throw error', async () => {
      expect(wrapper.vm.survey).not.toThrow();
    });
  });
});
