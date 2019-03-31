import Factory from '@/__tests__/__setups__/factory';
import Heading from '@/components/atoms/heading';

describe('Heading', () => {
  it('render correctly', () => {
    const wrapper = new Factory(Heading, {
      slots: {
        default: '<h1>Title</h1>'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
