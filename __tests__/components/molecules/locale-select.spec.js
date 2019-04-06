import Factory from '@/__tests__/__setups__/factory';
import LocaleSelect from '@/components/molecules/locale-select';

describe('LocaleSelect', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(LocaleSelect, {
      data() {
        return {
          locales: {
            en: 'English',
            ja: '日本語'
          }
        };
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory.mount();
      wrapper.findAll('option').at(1).element.selected = true;
      wrapper.find('select').trigger('change');
    });

    it('change locale page', () => {
      expect(factory.options.mocks.switchLocalePath).toHaveBeenCalledWith('ja');
      expect(factory.options.mocks.$router.push).toHaveBeenCalled();
    });
  });
});
