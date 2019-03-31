import Factory from '@/__tests__/__setups__/factory';
import TextField from '@/components/atoms/text-field';

describe('TextField', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(TextField, {
      propsData: {
        value: 'value'
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when enter text', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setValue('updated');
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')).toBeTruthy();
    });
  });
});
