import Factory from '@/__tests__/__setups__/factory';
import Dot from '@/components/atoms/dot';

describe('Dot', () => {
  it('render correctly', () => {
    const wrapper = new Factory(Dot, {
      propsData: {
        color: '#ff0000'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
