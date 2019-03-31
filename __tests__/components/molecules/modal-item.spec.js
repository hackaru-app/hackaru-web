import Factory from '@/__tests__/__setups__/factory';
import ModalItem from '@/components/molecules/modal-item';

describe('ModalItem', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ModalItem, {
      slots: {
        default: '<p>Content</p>'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
