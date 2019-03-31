import Factory from '@/__tests__/__setups__/factory';
import ModalHeader from '@/components/molecules/modal-header';

describe('ModalHeader', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ModalHeader, {
      slots: {
        default: '<h1>Title</h1>'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
