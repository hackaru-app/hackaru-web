import Factory from '@/__tests__/__setups__/factory';
import Btn from '@/components/atoms/btn';

describe('Btn', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(Btn);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click button', () => {
    it('emit click', () => {
      wrapper = factory.shallow();
      wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});
