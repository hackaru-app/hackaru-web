import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import LocaleSelect from '@/components/molecules/locale-select';

describe('LocaleSelect', () => {
  let factory;
  let wrapper;

  const $store = new Store({});
  const switchLocalePath = jest.fn();
  const setLocaleCookie = jest.fn();
  const $router = { push: jest.fn() };

  beforeEach(() => {
    factory = () =>
      shallowMount(LocaleSelect, {
        mocks: {
          $store,
          switchLocalePath,
          $router,
          $i18n: {
            locale: 'en',
            setLocaleCookie
          }
        }
      });
  });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'base-select' }).vm.$emit('change', 'ja');
    });

    it('dispatch user/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('user/update', {
        locale: 'ja'
      });
    });
  });
});
