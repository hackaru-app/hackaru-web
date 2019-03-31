import Factory from '@/__tests__/__setups__/factory';
import SideBar from '@/components/organisms/side-bar';

describe('SideBar', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(SideBar);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click add button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.add-button').trigger('click');
    });

    it('show new activity modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'activity'
      );
    });
  });
});
