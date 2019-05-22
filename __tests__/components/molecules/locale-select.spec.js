import { shallowMount } from '@vue/test-utils';
import LocaleSelect from '@/components/molecules/locale-select';

describe('LocaleSelect', () => {
  let factory;
  let wrapper;

  const switchLocalePath = jest.fn();
  const $router = { push: jest.fn() };

  beforeEach(() => {
    factory = () =>
      shallowMount(LocaleSelect, {
        mocks: {
          switchLocalePath,
          $router,
          $i18n: { locale: 'en' }
        }
      });
  });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'base-select' }).vm.$emit('change', 'ja');
    });

    it('change locale', () => {
      expect(switchLocalePath).toHaveBeenCalledWith('ja');
      expect($router.push).toHaveBeenCalled();
    });
  });
});
