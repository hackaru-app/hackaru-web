import Factory from '@/__tests__/__setups__/factory';
import Highlight from '@/components/atoms/highlight';

describe('Highlight', () => {
  it('render correctly', () => {
    const wrapper = new Factory(Highlight, {
      slots: {
        default: '<p>Highlight text</p>'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
