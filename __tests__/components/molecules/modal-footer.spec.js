import Factory from '@/__tests__/__setups__/factory';
import ModalFooter from '@/components/molecules/modal-footer';

describe('ModalFooter', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ModalFooter, {
      slots: {
        default: '<p>Content</p>'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
