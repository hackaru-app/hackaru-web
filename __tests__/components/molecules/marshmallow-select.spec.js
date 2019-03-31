import Factory from '@/__tests__/__setups__/factory';
import MarshmallowSelect from '@/components/molecules/marshmallow-select';

describe('MarshmallowSelect', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(MarshmallowSelect, {
      propsData: {
        ariaLabel: 'Fruits',
        value: 'Apple'
      },
      slots: {
        default: `
          <option value="apple">Apple</option>
          <option value="orange">Orange</option>
          <option value="lemon">Lemon</option>
        `
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when select', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.findAll('option').at(1).element.selected = true;
      wrapper.find('select').trigger('input');
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')[0]).toEqual(['orange']);
    });
  });
});
