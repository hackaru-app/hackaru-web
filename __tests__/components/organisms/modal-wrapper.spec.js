import Factory from '@/__tests__/__setups__/factory';
import ModalWrapper from '@/components/organisms/modal-wrapper';

describe('ModalWrapper', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(ModalWrapper, {
      stubs: ['modal'],
      propsData: {
        name: 'example'
      },
      slots: {
        default: '<p>Content</p>'
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when emit before-open', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'modal' }).vm.$emit('before-open');
    });

    it('emit before-open', () => {
      expect(wrapper.emitted('before-open')).toBeTruthy();
    });
  });
});
