import Factory from '@/__tests__/__setups__/factory';
import ColorSelect from '@/components/molecules/color-select';

describe('ColorSelect', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(ColorSelect);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when color select', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ colors: ['#ff0', '#f00', '#0ff'] });
      wrapper
        .findAll('button')
        .at(0)
        .trigger('click');
    });

    it('emit update:value', () => {
      expect(wrapper.emitted('update:value')[0]).toEqual(['#ff0']);
    });
  });
});
