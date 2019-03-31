import Factory from '@/__tests__/__setups__/factory';
import ModalLabel from '@/components/molecules/modal-label';

describe('ModalLabel', () => {
  it('render correctly', () => {
    const wrapper = new Factory(ModalLabel, {
      slots: {
        default: 'Label text'
      }
    }).shallow();
    expect(wrapper.element).toMatchSnapshot();
  });
});
