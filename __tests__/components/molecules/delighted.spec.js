import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Delighted from '@/components/molecules/delighted';

describe('Delighted', () => {
  const $store = new Store({});
  const $env = {};

  beforeEach(() => {
    window.delighted = {
      survey: jest.fn()
    };
  });

  const factory = () =>
    shallowMount(Delighted, {
      mocks: {
        $env,
        $store,
        $i18n: {
          locale: 'en'
        },
        $loadScript: () => {}
      }
    });

  describe('when env has DELIGHTED_TOKEN', () => {
    beforeEach(() => {
      $store.getters['auth/userId'] = 1;
      $env.DELIGHTED_TOKEN = 'token';
      factory();
    });

    it('show survey', () => {
      expect(window.delighted.survey).toHaveBeenCalledWith({
        name: 1,
        properties: {
          locale: 'en'
        }
      });
    });
  });

  describe('when env does not habe DELIGHTED_TOKEN', () => {
    beforeEach(() => {
      $env.DELIGHTED_TOKEN = undefined;
      factory();
    });

    it('does not show survey', () => {
      expect(window.delighted.survey).not.toHaveBeenCalled();
    });
  });
});
