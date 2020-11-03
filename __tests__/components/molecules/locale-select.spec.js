import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import LocaleSelect from '@/components/molecules/locale-select';

describe('LocaleSelect', () => {
  let factory;
  let wrapper;

  const $store = new Store({});
  const setLocale = jest.fn();

  beforeEach(() => {
    factory = () =>
      shallowMount(LocaleSelect, {
        mocks: {
          $store,
          $i18n: {
            setLocale,
            locale: 'en',
            locales: [
              {
                code: 'en',
                name: 'English',
              },
              {
                code: 'ja',
                name: '日本語',
              },
            ],
          },
        },
      });
  });

  it('has selected value correctly', () => {
    expect(factory().find({ ref: 'base-select' }).vm.value).toEqual('English');
  });

  describe('when select and user is logged in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = true;
      wrapper = factory();
      wrapper.find({ ref: 'base-select' }).vm.$emit('change', 'ja');
    });

    it('dispatches user/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('user/update', {
        locale: 'ja',
      });
    });
  });

  describe('when select and user is not logged in', () => {
    beforeEach(() => {
      $store.getters['auth/loggedIn'] = false;
      wrapper = factory();
      wrapper.find({ ref: 'base-select' }).vm.$emit('change', 'ja');
    });

    it('sets locale', () => {
      expect(setLocale).toHaveBeenCalledWith('ja');
    });
  });
});
